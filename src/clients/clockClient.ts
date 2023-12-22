import axios, {AxiosError} from "axios";
import {NavigateFunction} from "react-router-dom";
import {server} from "../utils/api";
import {getToken, clearToken, tokenExpired} from '../utils/util';
import {ClockData} from "../game/model/ClockDataTypes";

const clockClient = {
  getClock: async (gameId: number, navigate: NavigateFunction): Promise<ClockData | null> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get(`/api/v4/games/${gameId}/clock`, {
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
  stepBack: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    await clockClient.clockControl('clock-step-back', gameId, navigate);
  },
  back: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    await clockClient.clockControl('clock-back', gameId, navigate);
  },
  pause: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    await clockClient.clockControl('clock-pause', gameId, navigate);
  },
  resume: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    await clockClient.clockControl('clock-resume', gameId, navigate);
  },
  forward: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    await clockClient.clockControl('clock-forward', gameId, navigate);
  },
  stepForward: async (gameId: number, navigate: NavigateFunction): Promise<void> => {
    await clockClient.clockControl('clock-step-forward', gameId, navigate);
  },
  clockControl: async (action: string, gameId: number, navigate: NavigateFunction): Promise<void> => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await server.post('/api/v4/games/' + gameId + '/clock', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `application/vnd.texastoc.${action}+json`
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

export default clockClient;
