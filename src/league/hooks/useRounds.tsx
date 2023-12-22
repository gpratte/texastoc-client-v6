import {useContext, useEffect, useState} from "react";
import {NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import leagueClient from "../../clients/leagueClient";
import {Round} from "../model/LeagueDataTypes";
import refreshRoundsAction from "../redux/refreshRoundsAction";

export default function useRounds() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const rounds : Array<Round> | null = await leagueClient.getRounds(navigate);
        if (rounds) {
          leagueStore.dispatch(refreshRoundsAction(rounds));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage('Problem getting rounds')
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage('Problem getting rounds')
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