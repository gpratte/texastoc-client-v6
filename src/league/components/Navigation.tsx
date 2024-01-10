import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Badge, Button, Dropdown} from "react-bootstrap";
import loginClient from "../../clients/loginClient";
import {NotificationData} from "../model/NotificationDataBuilder";
import {LeagueContext, LeagueContextType} from "./League";

function Navigation(props: { notifications: Array<NotificationData>, showNotifications: () => void }) {
  const {routePrefix} = useContext(LeagueContext) as LeagueContextType;
  const navigate = useNavigate();
  const signOut = () => {
    loginClient.logout();
    navigate(`${routePrefix}/login`);
  }

  return (
    <>
      <div className="d-flex bg-black text-white">
        <Link to={`${routePrefix}/home`} className={'flex-grow-1 ms-3 p-2'}>
          <i className="nav-home fa-solid fa-house"></i>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Dropdown>
          <Dropdown.Toggle className={'nav-home'} variant="link" id="dropdown-basic">
            <i className="nav-home fa-regular fa-user"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button variant="link" onClick={signOut}>Log Out</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className={'nav-bar-right'}>
          <Dropdown.Toggle className={'nav-home'} variant="link" id="dropdown-basic">
            <i className="nav-home fas fa-bars"/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={`${routePrefix}/new-game`}>
                <Button variant="link">New Game</Button>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {props.notifications.length === 0 &&
          <span className={'p-2 me-3'}>
              <i className="fa-solid fa-bell-slash"></i>
            </span>
        }
        {props.notifications.length > 0 &&
          <span className={'p-2 me-3'} style={{cursor: "pointer"}} onClick={() => props.showNotifications()}>
            <i className="nav-home fa-solid fa-bell"></i>
            <Badge bg={"warning"}>{props.notifications.length}</Badge>
          </span>
        }
      </div>
    </>
  )
}

export default Navigation
