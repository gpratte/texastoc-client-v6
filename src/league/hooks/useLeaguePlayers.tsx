import {useContext, useEffect} from "react";
import {NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../components/League";
import leagueStore from "../../league/redux/leagueStore";
import leagueClient from "../../clients/leagueClient";
import {LeaguePlayerData} from "../model/LeagueDataTypes";
import refreshLeaguePlayersAction from "../redux/refreshLeaguePlayersAction";

export default function useLeaguePlayers() {
  const {server, toggleLoadingGlobal, newNotification} = useContext(LeagueContext) as LeagueContextType;

  useEffect(() => {
    async function init() {
      try {
        toggleLoadingGlobal(true);
        const leaguePlayers : Array<LeaguePlayerData> | null = await leagueClient.getPlayers(server);
        if (leaguePlayers) {
          leagueStore.dispatch(refreshLeaguePlayersAction(leaguePlayers));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage('Problem getting league players 1')
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage('Problem getting league players 2')
          .build());
      } finally {
        toggleLoadingGlobal(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])
}