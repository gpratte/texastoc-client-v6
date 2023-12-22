import {useContext, useEffect, useState} from "react";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import quarterlySeasonClient from "../../clients/quarterlySeasonClient";
import refreshQuarterlySeasonAction from "../redux/refreshQuarterlySeasonAction";

export default function useQuarterlySeasons(seasonId: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const quarterlies = await quarterlySeasonClient.getQuarterlies(seasonId, navigate);
        if (quarterlies) {
          leagueStore.dispatch(refreshQuarterlySeasonAction(quarterlies));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage(`Problem getting quarterly seasons ${seasonId}`)
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage(`Problem getting quarterly seasion ${seasonId}`)
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