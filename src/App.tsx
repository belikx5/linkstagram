import "./styles/App.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tryLocalSignIn } from "./store/actions/userActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import RouterComponent from "./Router";
import AppWrapper from "./components/AppWrapper";

function App() {
  const dispatch = useDispatch();
  const currentUser = useTypedSelector((state) => state.userState.currentUser);
  useEffect(() => {
    if (!currentUser) dispatch(tryLocalSignIn());
  }, []);

  return (
    <div className="App">
      <AppWrapper>
        <RouterComponent />
      </AppWrapper>
    </div>
  );
}

export default App;
