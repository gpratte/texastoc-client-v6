import {useContext} from "react";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import {NotificationDataBuilder} from "../../league/model/NotificationDataBuilder";
import {useNavigate} from "react-router-dom";

function useFinalize(gameId: number) {
  const {newNotification, refreshGame} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();

  const finalize = async () => {
    try {
      await gameClient.finalize(gameId, navigate);
      refreshGame(gameId);
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
      await gameClient.unfinalize(gameId, navigate);
      refreshGame(gameId);
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
    finalize,
    unfinalize
  };
}

export default useFinalize;