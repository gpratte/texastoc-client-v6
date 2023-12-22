import {server} from "../utils/api";
import axios, {AxiosError} from "axios";
import {clearToken, getToken, tokenExpired} from "../utils/util";
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
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
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
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
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
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
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
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
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
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },
  deletePlayer: async (gameId: number, gamePlayerId: number, navigate: NavigateFunction): Promise<void> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await server.delete(`/api/v4/games/${gameId}/players/${gamePlayerId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },
  finalize: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await server.put(`/api/v4/games/${gameId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/vnd.texastoc.finalize+json'
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  },
  unfinalize: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await server.put(`/api/v4/games/${gameId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/vnd.texastoc.unfinalize+json'
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error as AxiosError).response?.status === 403 && tokenExpired(token)) {
          clearToken();
          navigate("/login");
          throw new Error("Token expired");
        }
      }
      throw error;
    }
  }
}

export default gameClient;