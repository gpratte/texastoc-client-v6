import {server} from "../utils/api";
import axios, {AxiosError} from "axios";
import {clearToken, getToken} from "../utils/util";
import {NavigateFunction} from "react-router-dom";
import {LeaguePlayerData, Round, Settings} from "../league/model/LeagueDataTypes";

const leagueClient = {
  getPlayers: async (navigate: NavigateFunction): Promise<Array<LeaguePlayerData> | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get('/api/v4/players', {
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
  getRounds: async (navigate: NavigateFunction): Promise<Array<Round> | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get('/api/v4/clock/rounds', {
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
  getSettings: async (navigate: NavigateFunction): Promise<Settings | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get('/api/v4/settings', {
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
  }
}

export default leagueClient;
