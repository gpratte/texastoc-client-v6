import {server} from "../utils/api";
import axios, {AxiosError} from "axios";
import {SeasonData} from "../season/model/SeasonDataTypes";
import {getToken, clearToken} from '../utils/util';
import {NotificationData} from "../league/model/NotificationDataBuilder";
import {NavigateFunction} from "react-router-dom";

const seasonClient = {
  // TODO remove the first parameter
  getCurrentSeasonId: async (newNotification: (n: NotificationData) => void, navigate: NavigateFunction): Promise<number> => {
    // TODO what to do if there is no token?
    const token = getToken();
    if (!token) {
      navigate("/login");
      return 0;
    }
    try {
      const result = await server.get('/api/v4/seasons', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (result.data.length > 0) {
        const season: SeasonData = result.data[result.data.length - 1];
        return season.id;
      }
      return 0;
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
  getSeason: async (id: number,
                    newNotification: (n: NotificationData) => void,
                    navigate: NavigateFunction): Promise<SeasonData | null> => {
    // TODO what to do if there is no token?
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get(`/api/v4/seasons/${id}`, {
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

export default seasonClient;
