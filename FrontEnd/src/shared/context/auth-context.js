import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
