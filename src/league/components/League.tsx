import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/league.css'
import useNotifications from "../hooks/useNotifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {createContext} from "react";
import {Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import ErrorNotification from "./ErrorNotification";
import Notifications from "./Notifications";
import Footer from "./Footer";
import Home from "../../home/components/Home";
import Game from "../../game/components/Game";
import Season from "../../season/components/Season";
import Loading from "../../common/components/Loading";
import {NotificationData} from "../model/NotificationDataBuilder";
import Login from "../../login/components/Login";
import LeaguePlayers from "./LeaguePlayers";
import Rounds from "./Rounds";
import Points from "./Points";

export interface NotificationContextType {
  newNotification(notify: NotificationData): void;
  toggleLoadingGlobal(show: boolean): void;
  isGlobalLoading: boolean;
}
export const NotificationContext = createContext<NotificationContextType | null>(null);

function League() {
  const {
    newNotification,
    toggleLoadingGlobal,
    notification,
    notifications,
    showNotifications,
    closeNotification,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel,
    isGlobalLoading
  } = useNotifications(30000);

  return (
    <NotificationContext.Provider value={{newNotification, isGlobalLoading, toggleLoadingGlobal}}>
      <div>
        <Loading isLoading={isGlobalLoading}/>
        <Navigation notifications={notifications} showNotifications={showNotificationsPanel}/>
        <Container className="main-view">
          <Row className="justify-content-center text-center">
            <Col>
              <ErrorNotification notification={notification}
                                 deleteNotification={deleteNotification}
                                 closeNotification={closeNotification}
              />
              <Notifications show={showNotifications}
                             hide={hideNotificationsPanel}
                             deleteNotification={deleteNotification}
                             deleteAllNotifications={deleteAllNotifications}
                             notifications={notifications}/>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col>
              <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/home/*" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="/current-game" element={<Game />} />
                <Route path="/season" element={<Season />} />
                <Route path="/players" element={<LeaguePlayers />} />
                <Route path="/rounds" element={<Rounds />} />
                <Route path="/points" element={<Points />} />
              </Routes>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col>
              <Footer/>
            </Col>
          </Row>
        </Container>
      </div>
    </NotificationContext.Provider>
  )
}

export default League;