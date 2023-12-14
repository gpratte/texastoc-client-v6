import {useContext, useEffect, useState} from "react";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {NotificationContext, NotificationContextType} from "../../league/components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import gameClient from "../../clients/gameClient";
import refreshGamesAction from "../redux/refreshGamesAction";
import {GameData} from "../../game/model/GameDataTypes";

export default function useGames(seasonId: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const games : Array<GameData> | null = await gameClient.getGames(seasonId, navigate);
        if (games) {
          leagueStore.dispatch(refreshGamesAction(games));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage(`Problem getting games ${seasonId}`)
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage(`Problem getting games ${seasonId}`)
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