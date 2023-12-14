import {useContext, useEffect, useState} from "react";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {NotificationContext, NotificationContextType} from "../../league/components/League";
import seasonClient from "../../clients/seasonClient";
import leagueStore from "../../league/redux/leagueStore";
import refreshSeasonAction from "../redux/refreshSeasonAction";
import {useNavigate} from "react-router-dom";

function useSeason(seasonId: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        let currentSeasonId = seasonId;
        if (currentSeasonId === 0) {
          currentSeasonId = await seasonClient.getCurrentSeasonId(newNotification, navigate);
          if (currentSeasonId === 0) {
            newNotification(new NotificationDataBuilder()
              .withMessage("Problem getting season")
              .withType(NotificationType.ERROR)
              .build());
          }
        }

        if (currentSeasonId !== 0) {
          const season = await seasonClient.getSeason(currentSeasonId, newNotification, navigate);
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
        setIsLoading(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])

  return {
    isLoading
  };
}

export default useSeason;