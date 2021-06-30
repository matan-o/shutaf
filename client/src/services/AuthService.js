import {BASE_API_URL, AUTH_API_PATH} from '../consts'

class AuthService {
  baseApiPath;

  constructor() {
    this.baseApiPath = BASE_API_URL + AUTH_API_PATH;
  }

  onLogin() {}
  onRegister() {}
}

export default AuthService;
