import {useEffect} from "react";
import {NotificationData, NotificationDataBuilder} from "../model/NotificationDataBuilder";
import {useNavigate} from "react-router-dom";
import {getSeason} from "../../season/seasonUtils";

export default function useLeague(seasonId : number, newNotification: (n: NotificationData) => void) {
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        if (seasonId === 0) {
          await getSeason(navigate, newNotification);
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage("Problem getting season")
          .build());
      }
    }

    init();
    // eslint-disable-next-line
  }, [])
}