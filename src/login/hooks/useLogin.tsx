import {useContext} from "react";
import loginClient from "../../clients/loginClient";
import {NotificationDataBuilder} from "../../league/model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import {useNavigate} from "react-router-dom";

export default function useLogin() {
  const {newNotification} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      await loginClient.login(email, password);
      navigate("/home");
    } catch (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem loggin in")
        .build());
    }
  }

  return {
    login,
  };
}