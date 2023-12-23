import seasonClient from "../clients/seasonClient";
import leagueStore from "../league/redux/leagueStore";
import {setSeasonId} from "./redux/seasonActions";
import {NotificationData, NotificationDataBuilder, NotificationType} from "../league/model/NotificationDataBuilder";
import {AxiosInstance} from "axios";

export async function getSeason(server: AxiosInstance, newNotification : (notify: NotificationData) => void) : Promise<number> {
  let seasonId : number = 0;
  try {
    seasonId = await seasonClient.getCurrentSeasonId(server);
    if (seasonId) {
      leagueStore.dispatch(setSeasonId(seasonId));
    } else {
      newNotification(new NotificationDataBuilder()
        .withMessage('Problem getting the season Id')
        .withType(NotificationType.ERROR)
        .build());
    }
  } catch (error) {
    newNotification(new NotificationDataBuilder()
      .withObj(error)
      .withMessage('Problem getting the season Id')
      .build());
  }
  return seasonId;
}
