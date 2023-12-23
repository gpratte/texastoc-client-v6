import {useEffect, useState} from "react";
import {NotificationData} from "../model/NotificationDataBuilder";
import {useNavigate} from "react-router-dom";
import {getSeason} from "../../season/seasonUtils";

export default function useLeague(seasonId : number, newNotification: (n: NotificationData) => void) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        if (seasonId === 0) {
          await getSeason(navigate, newNotification);
        }
      } finally {
        setIsLoading(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])

  return {
    isLoading
  };
}