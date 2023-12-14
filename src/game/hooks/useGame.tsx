import {useContext, useEffect, useState} from "react";
import {NotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import {GameData} from "../model/GameDataTypes";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {NotificationContextType} from "../../league/components/League";
import leagueStore from "../../league/redux/leagueStore";
import refreshGameAction from "../redux/refreshGameAction";
import {useNavigate} from "react-router-dom";
import refreshGamesAction from "../../season/redux/refreshGamesAction";

function useGame(id : number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useGame.useEffect entered')

    async function init() {
      try {
        setIsLoading(true);
        const game: GameData | null = await gameClient.getGame(id, navigate);
        if (game) {
          leagueStore.dispatch(refreshGameAction(game));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage(`Problem getting game ${id}`)
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

    init();
    // eslint-disable-next-line
  }, [])

  const refreshGame = async (): Promise<void> => {
    console.log('refresh game')
    try {
      setIsLoading(true);
      const game = await gameClient.getGame(id, navigate);
      if (game) {
        leagueStore.dispatch(refreshGameAction(game));
      } else {
        newNotification(new NotificationDataBuilder()
          .withMessage(`Problem getting game ${id}`)
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
    refreshGame,
    isLoading,
    showAddPlayer,
    setShowAddPlayer
  };
}

export default useGame;