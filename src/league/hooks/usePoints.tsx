import {useContext, useEffect} from "react";
import {NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../components/League";
import leagueStore from "../../league/redux/leagueStore";
import leagueClient from "../../clients/leagueClient";
import {Settings} from "../model/LeagueDataTypes";
import refreshSettingsAction from "../redux/refreshSettingsAction";

export default function usePoints() {
  const {server, toggleLoadingGlobal, newNotification} = useContext(LeagueContext) as LeagueContextType;

  useEffect(() => {
    async function init() {
      try {
        toggleLoadingGlobal(true);
        const settings : Settings | null = await leagueClient.getSettings(server);
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
        toggleLoadingGlobal(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])
}