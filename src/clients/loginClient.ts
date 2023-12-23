import {server} from '../utils/api';
import {setToken, clearToken} from '../utils/util';

const loginClient = {
  login: async (email: string, password: string) => {
    const result = await server.post('/api/v4/login',
      {email: email, password: password},
      {
        headers: {'Content-Type': 'application/json'}
      });
    if (result.data?.token) {
      setToken(result.data.token);
    } else {
      throw new Error('Problem logging in, no token returned');
    }
  },
  logout: () => {
    clearToken();
  }
}

export default loginClient