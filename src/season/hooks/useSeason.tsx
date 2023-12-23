import {useContext, useEffect} from "react";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import seasonClient from "../../clients/seasonClient";
import leagueStore from "../../league/redux/leagueStore";
import {refreshSeasonAction} from "../redux/seasonActions";
import {getSeason} from "../seasonUtils";

function useSeason(seasonId: number) {
  const {server, toggleLoadingGlobal, newNotification} = useContext(LeagueContext) as LeagueContextType;

  useEffect(() => {
    async function init() {
      try {
        toggleLoadingGlobal(true);
        let currentSeasonId = seasonId;
        if (currentSeasonId === 0) {
          currentSeasonId = await getSeason(server, newNotification);
        }

        if (currentSeasonId !== 0) {
          const season = await seasonClient.getSeason(server, currentSeasonId);
          if (season) {
            leagueStore.dispatch(refreshSeasonAction(season));
          } else {
            newNotification(new NotificationDataBuilder()
              .withMessage(`Problem getting season ${seasonId}`)
              .withType(NotificationType.ERROR)
              .build());
          }
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage(seasonId === 0 ? "Problem getting season" : `Problem getting seasion ${seasonId}`)
          .build());
      } finally {
        toggleLoadingGlobal(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])
}

export default useSeason;