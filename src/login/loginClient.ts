import {server} from '../utils/api';
import {setToken, clearToken} from '../utils/util';
import {NotificationData, NotificationDataBuilder, NotificationType} from "../league/model/NotificationDataBuilder";

// TODO  move to the clients directory
export function login(email: string,
                      password: string,
                      toggleLoadingGlobal: (b: boolean) => void,
                      newNotification: (n: NotificationData) => void): void {

  server.post('/api/v4/login',
    {email: email, password: password},
    {
      headers: {'Content-Type': 'application/json'}
    }
  )
    .then(result => {
      if (result.data?.token) {
        setToken(result.data.token);
      } else {
        newNotification(new NotificationDataBuilder()
          .withMessage("Problem logging in, no token returned")
          .withType(NotificationType.ERROR)
          .build());
      }
    })
    .catch(function (error) {
      newNotification(new NotificationDataBuilder()
        .withObj(error)
        .withMessage("Problem logging in")
        .build());
    }).finally(() => {
    toggleLoadingGlobal(false);
  });
}

export function logout(): void {
  clearToken();
}
