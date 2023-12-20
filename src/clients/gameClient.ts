import {server} from "../utils/api";
import axios, {AxiosError} from "axios";
import {clearToken, delay, getRandomInt, getToken} from "../utils/util";
import {
  AddExistingPlayerData,
  AddNewPlayerData,
  GameData,
  GamePlayerData
} from "../game/model/GameDataTypes";
import {NavigateFunction} from "react-router-dom";

const gameClient = {
  getGames: async (seasonId: number, navigate: NavigateFunction): Promise<Array<GameData> | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get(`/api/v4/seasons/${seasonId}/games`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },

  getGame: async (id: number, navigate: NavigateFunction): Promise<GameData | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get(`/api/v4/games/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },
  addExistingPlayer: async (gameId: number, player: AddExistingPlayerData, navigate: NavigateFunction): Promise<GamePlayerData | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.post(`/api/v4/games/${gameId}/players`,
        player,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },
  addNewPlayer: async (gameId: number, player: AddNewPlayerData, navigate: NavigateFunction): Promise<GamePlayerData | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.post(`/api/v4/games/${gameId}/players`,
        player,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/vnd.texastoc.first-time+json'
          }
        });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },
  updatePlayer: async (gameId: number, gamePlayer: GamePlayerData, navigate: NavigateFunction): Promise<GamePlayerData | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.patch(`/api/v4/games/${gameId}/players/${gamePlayer.id}`,
        gamePlayer,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },

  deletePlayer: async (gameId: number, gamePlayerId: number) => {
    // delay 1 to 2 seconds
    await delay(getRandomInt(1000, 2000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not delete player' + Date.now()
      };
    }
  }
}

export default gameClient;