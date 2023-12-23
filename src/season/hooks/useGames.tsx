import {useContext, useEffect} from "react";
import {NotificationDataBuilder, NotificationType} from "../../league/model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import leagueStore from "../../league/redux/leagueStore";
import {useNavigate} from "react-router-dom";
import gameClient from "../../clients/gameClient";
import refreshGamesAction from "../redux/refreshGamesAction";
import {GameData} from "../../game/model/GameDataTypes";

export default function useGames(seasonId: number) {
  const {newNotification} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        const games : Array<GameData> | null = await gameClient.getGames(seasonId, navigate);
        if (games) {
          leagueStore.dispatch(refreshGamesAction(games));
        } else {
          newNotification(new NotificationDataBuilder()
            .withMessage(`Problem getting games ${seasonId}`)
            .withType(NotificationType.ERROR)
            .build());
        }
      } catch (error) {
        newNotification(new NotificationDataBuilder()
          .withObj(error)
          .withMessage(`Problem getting games ${seasonId}`)
          .build());
      }
    }

    init();
    // eslint-disable-next-line
  }, [])
}