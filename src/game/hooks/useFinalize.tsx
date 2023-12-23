import {useContext} from "react";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import {NotificationDataBuilder} from "../../league/model/NotificationDataBuilder";
import {useNavigate} from "react-router-dom";
import {GameContext, GameContextType} from "../components/Game";

function useFinalize(gameId: number) {
  const {newNotification} = useContext(LeagueContext) as LeagueContextType;
  const {refreshGame} = useContext(GameContext) as GameContextType;
  const navigate = useNavigate();

  const finalize = async () => {
    try {
      await gameClient.finalize(gameId, navigate);
      refreshGame(gameId);
    } catch (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem finalizing game")
        .build());
    }
  }

  const unfinalize = async () => {
    try {
      await gameClient.unfinalize(gameId, navigate);
      refreshGame(gameId);
    } catch (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem unfinalizing game")
        .build());
    }
  }

  return {
    finalize,
    unfinalize
  };
}

export default useFinalize;