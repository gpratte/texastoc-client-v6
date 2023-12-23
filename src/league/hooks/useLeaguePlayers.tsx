import {useContext, useEffect} from "react";
import {NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import leagueClient from "../../clients/leagueClient";
import {LeaguePlayerData} from "../model/LeagueDataTypes";
import refreshLeaguePlayersAction from "../redux/refreshLeaguePlayersAction";

export default function useLeaguePlayers() {
  const {toggleLoadingGlobal, newNotification} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        toggleLoadingGlobal(true);
        const leaguePlayers : Array<LeaguePlayerData> | null = await leagueClient.getPlayers(navigate);
        if (leaguePlayers) {
          leagueStore.dispatch(refreshLeaguePlayersAction(leaguePlayers));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage('Problem getting league players')
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage('Problem getting league players')
          .build());
      } finally {
        toggleLoadingGlobal(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])
}