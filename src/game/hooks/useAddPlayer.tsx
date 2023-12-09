import {useContext, useEffect, useState} from "react";
import seasonClient from "../../clients/seasonClient";
import {GameContext, GameContextType} from "../components/Game";
import {NotificationContext, NotificationContextType} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import playerClient from "../../clients/playerClient";
import {PlayerData} from "../../player/model/PlayerData";
import {SeasonPlayerData} from "../../season/model/SeasonPlayerData";
import {NotificationData} from "../../league/model/NotificationData";

function useAddPlayer() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [leaguePlayers, setLeaguePlayers] = useState<Array<PlayerData>>([])
  const [seasonPlayers, setSeasonPlayers] = useState<Array<SeasonPlayerData>>([])
  const [activeTabKey, setActiveTabKey] = useState<string>('league-player');

  const {game, refreshGame, setShowAddPlayer} = useContext(GameContext) as GameContextType;
  const {newNotification} = useContext(NotificationContext) as NotificationContextType;

  useEffect(() => {
    async function init() {
      try {
        const leaguePlayers = await playerClient.getPlayers(game.id);
        // No need to use a function for the setLeaguePlayers but doing it just to show
        // that the argument is the current state of leaguePlayers.
        setLeaguePlayers((currentLeaguePlayers) => {
          // console.log('using a FUNCTION for the set league players, argument is ' +
          //   JSON.stringify(currentLeaguePlayers))
          return leaguePlayers
        });
      } catch (error) {
        newNotification(NotificationData.fromObject(error));
      }
      try {
        const season = await seasonClient.getSeason(game.seasonId);
        if (season.players) {
          setSeasonPlayers(season.players);
        }
      } catch (error) {
        newNotification(NotificationData.fromObject(error));
      }
      setIsLoading(false);
    }

    init();
    // eslint-disable-next-line
  }, [])

  const addGamePlayer = async (e: any): Promise<void> => {
    e.preventDefault();
    if (activeTabKey === 'league-player') {
      if (e.target.elements.playerId.value === '0') {
        alert("Select a player");
        return;
      }
      setShowAddPlayer(false);
      try {
        const id = Number.parseInt(e.target.elements.playerId.value);
        const playerData: PlayerData | undefined = PlayerData.fromObj({id});
        if (playerData !== undefined) {
          await gameClient.addPlayer(game.id, playerData);
        }
        // await gameClient.addPlayer(game.id, {
        //   id: e.target.elements.playerId.value,
        //   buyin: e.target.elements.buyInId.checked,
        //   annualToc: e.target.elements.tocId.checked,
        //   qToc: e.target.elements.qtocId.checked
        // });
      } catch (error) {
        newNotification(NotificationData.fromObject(error));
      }
    } else {
      if (!e.target.elements.firstNameId.value && !e.target.elements.lastNameId.value) {
        alert("Enter a name");
        return;
      }
      setShowAddPlayer(false);
      try {
        const id = Number.parseInt(e.target.elements.id.value)
        const playerData: PlayerData | undefined = PlayerData.fromObj({id});
        if (playerData) {
          await gameClient.addPlayer(game.id, playerData);
        }
        // await gameClient.addPlayer(e.target.elements.firstNameId.value,
        //     e.target.elements.lastNameId.value,
        //     e.target.elements.emailId.value,
        //     e.target.elements.buyInId.checked,
        //     e.target.elements.tocId.checked,
        //     e.target.elements.qtocId.checked);
      } catch (error) {
        newNotification(NotificationData.fromObject(error));
      }
    }
    refreshGame();
  }


  return {
    addGamePlayer,
    leaguePlayers,
    seasonPlayers,
    activeTabKey,
    setActiveTabKey,
    isLoading
  };
}

export default useAddPlayer;