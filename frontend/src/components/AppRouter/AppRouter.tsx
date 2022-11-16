import { observer } from "mobx-react-lite";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../routes";
import user from "../../store/user";

const AppRouter = observer(() => {
  
  return (
    <Router>
      {user.user.isAuth ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      )}
    </Router>
  );
})

export default AppRouter;
