import {server} from "../utils/api";
import {getToken, clearToken} from '../utils/util';
import {NavigateFunction} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {QuarterlySeasonData} from "../season/model/QuarterlySeasonDataTypes";

const quarterlySeasonClient = {
  getQuarterlies: async (id: number, navigate: NavigateFunction): Promise<Array<QuarterlySeasonData> | null> => {
    // TODO what to do if there is no token?
    const token = getToken();
    if (!token) {
      navigate("/login");
      return null;
    }
    try {
      const result = await server.get(`/api/v4/seasons/${id}/quarterlies`, {
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

export default quarterlySeasonClient;
