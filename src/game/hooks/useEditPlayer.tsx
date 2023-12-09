import {useContext, useState} from "react";
import {GameContext, GameContextType} from "../components/Game";
import {NotificationContext, NotificationContextType} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import {GamePlayerData} from "../model/GamePlayerData";
import {NotificationData} from "../../league/model/NotificationData";

function useEditPlayer(gamePlayer: GamePlayerData) {

  const {game, refreshGame} = useContext(GameContext) as GameContextType;
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [accordionBodyKey, setAccordionBodyKey] = useState(Math.random());

  const [buyInChecked, setBuyInChecked] = useState(gamePlayer.boughtIn);
  const [rebuyChecked, setRebuyChecked] = useState(gamePlayer.rebought);
  const [annualTocChecked, setAnnualTocChecked] = useState(gamePlayer.annualTocParticipant);
  const [qTocChecked, setQTocChecked] = useState(gamePlayer.quarterlyTocParticipant);
  const [alertChecked, setAlertChecked] = useState(gamePlayer.roundUpdates);
  const [place, setPlace] = useState(gamePlayer.place);
  const [chop, setChop] = useState(gamePlayer.chop);

  const resetToOriginalState = (gamePlayer: GamePlayerData) => {
    setBuyInChecked(gamePlayer.boughtIn);
    setRebuyChecked(gamePlayer.rebought);
    setAnnualTocChecked(gamePlayer.annualTocParticipant);
    setQTocChecked(gamePlayer.quarterlyTocParticipant);
    setAlertChecked(gamePlayer.roundUpdates);
    setPlace(gamePlayer.place);
    setChop(gamePlayer.chop);
  }

  const deleteGamePlayer = async (gamePlayerId: number) => {
    try {
      await gameClient.deletePlayer(game.id, gamePlayerId);
    } catch (error) {
      newNotification(NotificationData.fromObject(error));
    }
    refreshGame();
  }

  const updateGamePlayer = async (gamePlayer: GamePlayerData) => {
    try {
      await gameClient.updatePlayer(gamePlayer);
    } catch (error) {
      newNotification(NotificationData.fromObject(error));
    }
    refreshGame();
  }

  return {
    accordionOpen, setAccordionOpen,
    accordionBodyKey, setAccordionBodyKey,
    buyInChecked, setBuyInChecked,
    rebuyChecked, setRebuyChecked,
    annualTocChecked, setAnnualTocChecked,
    qTocChecked, setQTocChecked,
    alertChecked, setAlertChecked,
    place, setPlace,
    chop, setChop,
    deleteGamePlayer,
    updateGamePlayer,
    resetToOriginalState
  };
}

export default useEditPlayer;