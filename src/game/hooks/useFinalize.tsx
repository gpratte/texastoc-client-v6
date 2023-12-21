import {useContext} from "react";
import {GameContext, GameContextType} from "../components/Game";
import {NotificationContext, NotificationContextType} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import {NotificationDataBuilder} from "../../league/model/NotificationDataBuilder";
import {useNavigate} from "react-router-dom";

function useFinalize() {
  const {game, refreshGame} = useContext(GameContext) as GameContextType;
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;
  const navigate = useNavigate();

  const finalize = async () => {
    try {
      await gameClient.finalize(game.id, navigate);
      refreshGame(game.id);
      // TODO
      // refresh season
    } catch (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem finalizing game")
        .build());
    }
  }

  const unfinalize = async () => {
    try {
      await gameClient.unfinalize(game.id, navigate);
      refreshGame(game.id);
      // TODO
      // refresh season
    } catch (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem unfinalizing game")
        .build());
    }
  }

  return {
    game,
    finalize,
    unfinalize
  };
}

export default useFinalize;