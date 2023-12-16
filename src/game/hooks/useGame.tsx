import {useContext, useEffect, useState} from "react";
import {NotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import {GameData} from "../model/GameDataTypes";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {NotificationContextType} from "../../league/components/League";
import leagueStore from "../../league/redux/leagueStore";
import refreshGameAction from "../redux/refreshGameAction";
import {useNavigate} from "react-router-dom";
import {convertDateToMoment, convertDateToString} from "../../utils/util";

function useGame(seasonId: number, gameId : number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useGame.useEffect entered')

    async function init() {
      try {
        setIsLoading(true);
        let currentGameId = gameId;
        if (currentGameId === 0) {
          const games : Array<GameData> | null = await gameClient.getGames(seasonId, navigate);
          if (games === null) {
            return;
          }
          // Use the first unfinalized game (only one should be unfinalized)
          const unfinalizedGame = games.find(g => {
            console.log(g.finalized);
            return !g.finalized;
          });
          if (unfinalizedGame) {
            currentGameId = unfinalizedGame.id;
          } else {
            // Use the game with this latest date
            let mostRecentGame : GameData | undefined;
            games.forEach(game => {
              if (!mostRecentGame) {
                mostRecentGame = game;
                return;
              }
              if (convertDateToMoment(game.date).isAfter(convertDateToString(mostRecentGame.date))) {
                mostRecentGame = game;
              }
            })
            if (mostRecentGame) {
              currentGameId = mostRecentGame.id;
            }
          }
        }
        const game: GameData | null = await gameClient.getGame(currentGameId, navigate);
        if (game) {
          leagueStore.dispatch(refreshGameAction(game));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage(`Problem getting game ${currentGameId}`)
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

  const refreshGame = async (gameId : number): Promise<void> => {
    console.log('refresh game')
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
    refreshGame,
    isLoading,
    showAddPlayer,
    setShowAddPlayer
  };
}

export default useGame;