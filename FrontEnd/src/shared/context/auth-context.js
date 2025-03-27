import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  refreshPage: () => {},
});

export default AuthContext;
