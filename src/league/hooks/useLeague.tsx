import {useEffect, useState} from "react";
import {NotificationData, NotificationDataBuilder, NotificationType} from "../model/NotificationDataBuilder";
import {useNavigate} from "react-router-dom";
import {getSeason} from "../../season/seasonUtils";
import gameClient from "../../clients/gameClient";
import leagueStore from "../redux/leagueStore";
import refreshGameAction from "../../game/redux/refreshGameAction";

export default function useLeague(seasonId : number, newNotification: (n: NotificationData) => void) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        if (seasonId === 0) {
          await getSeason(navigate, newNotification);
        }
      } finally {
        setIsLoading(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])

  const refreshGame = async (gameId : number): Promise<void> => {
    try {
      setIsLoading(true);
      const game = await gameClient.getGame(gameId, navigate);
      if (game) {
        leagueStore.dispatch(refreshGameAction(game));
      } else {
        newNotification(new NotificationDataBuilder()
          .withMessage(`Problem getting game ${gameId}`)
          .withType(NotificationType.ERROR)
          .build());
      }
    } catch (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem getting game")
        .build());
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    refreshGame
  };
}