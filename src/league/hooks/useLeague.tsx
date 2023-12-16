import {useEffect, useState} from "react";
import {NotificationData, NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import {setSeasonId} from "../../season/redux/seasonActions";
import seasonClient from "../../clients/seasonClient";

export default function useLeague(seasonId : number, newNotification: (n: NotificationData) => void) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const currentSeasonId : number | null = await seasonClient.getCurrentSeasonId(navigate);
        if (currentSeasonId && currentSeasonId !== seasonId) {
          leagueStore.dispatch(setSeasonId(currentSeasonId));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage('Problem getting the season Id')
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage('Problem getting the season Id')
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