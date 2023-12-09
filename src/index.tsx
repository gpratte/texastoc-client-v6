import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import leagueStore from "./league/redux/leagueStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ReduxProvider store={leagueStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
  // </React.StrictMode>
);
