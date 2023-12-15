import {useContext, useEffect, useState} from "react";
import {NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {NotificationContext, NotificationContextType} from "../components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import leagueClient from "../../clients/leagueClient";
import {LeaguePlayerData, Round, Settings} from "../model/LeagueDataTypes";
import refreshLeaguePlayersAction from "../redux/refreshLeaguePlayersAction";
import refreshRoundsAction from "../redux/refreshRoundsAction";
import refreshSettingsAction from "../redux/refreshSettingsAction";

export default function usePoints() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const settings : Settings | null = await leagueClient.getSettings(navigate);
        if (settings) {
          leagueStore.dispatch(refreshSettingsAction(settings));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage('Problem getting points')
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage('Problem getting points')
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