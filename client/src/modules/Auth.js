class Auth {

  static authenticateUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;


