import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import "./App.less";

import AppRouter from "./components/AppRouter/AppRouter";
import user from "./store/user";
import Loader from "./components/Loader/Loader";

const App = observer(() => {
  useEffect(() => {
    user.checkAuth();
 
  }, []);


  return <>{user.isLoading ? <Loader/> : <AppRouter />}</>;
});

export default App;
