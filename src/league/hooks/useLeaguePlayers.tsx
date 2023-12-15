import {useContext, useEffect, useState} from "react";
import {NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {NotificationContext, NotificationContextType} from "../components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import playerClient from "../../clients/playerClient";
import {LeaguePlayerData} from "../model/LeaguePlayerDataTypes";
import refreshLeaguePlayersAction from "../redux/refreshLeaguePlayersAction";

export default function useLeaguePlayers() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const leaguePlayers : Array<LeaguePlayerData> | null = await playerClient.getPlayers(navigate);
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