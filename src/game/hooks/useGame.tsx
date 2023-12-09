import {useContext, useEffect, useState} from "react";
import {NotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import { GameData } from "../model/GameData";
import {NotificationData} from "../../league/model/NotificationData";
import {NotificationContextType} from "../../league/components/League";
import leagueStore from "../../league/redux/leagueStore";
import refreshGameAction from "../redux/refreshGameAction";

function useGame() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  useEffect(() => {
    console.log('useGame.useEffect entered')

    async function init() {
      try {
        setIsLoading(true);
        const gameData: GameData = await gameClient.getGame();
        // Change the number of paid players value just to see that things changed
        gameData.numPaidPlayers = Math.random();
        leagueStore.dispatch(refreshGameAction(gameData));
      } catch (error) {
        newNotification(NotificationData.fromObject(error));
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
      const gameData = await gameClient.getGame();
      gameData.numPaidPlayers = Math.random();
      leagueStore.dispatch(refreshGameAction(gameData));
    } catch (error) {
      newNotification(NotificationData.fromObject(error));
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