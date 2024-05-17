import React, {Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import User from "./user/pages/User";
// import NewPlace from "./places/pages/NewPlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import Auth from "./user/pages/Auth";
import AuthContext from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const User = React.lazy(() => import("./user/pages/User"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const {token, login, logout, userId} = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main><Suspense fallback={<div className="center"> <LoadingSpinner /> </div>}>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;