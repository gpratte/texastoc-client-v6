import {server} from '../utils/api';
import {setToken} from '../utils/util';
import {NotificationData, NotificationDataBuilder, NotificationType} from "../league/model/NotificationDataBuilder";

export function login(email: string,
                      password: string,
                      updateLoginToRerender: () => void,
                      newNotification: (n: NotificationData) => void) {

  server.post('/api/v4/login',
    {email: email, password: password},
    {
      headers: {'Content-Type': 'application/json'}
    }
  )
    .then(result => {
      if (result.data?.token) {
        setToken(result.data.token);
        updateLoginToRerender();
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
  });
}
