import {server} from '../utils/api';
import {setToken} from '../utils/util';

export function login(email: string, password: string, updateFnc: () => void) {
  server.post('/api/v4/login', {email: email, password: password})
    .then(result => {
      setToken(result.data.token);
      updateFnc();
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
    }).finally(() => {
  });
}
