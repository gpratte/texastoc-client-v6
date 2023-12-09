import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import leagueStore from "./league/redux/leagueStore";
import League from "./league/components/League";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ReduxProvider store={leagueStore}>
    <BrowserRouter>
      <League />
    </BrowserRouter>
  </ReduxProvider>
  // </React.StrictMode>
);
