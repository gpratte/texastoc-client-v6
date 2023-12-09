import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Badge, Nav, NavDropdown} from "react-bootstrap";
import React from "react";
import {NotificationData} from "../model/NotificationData";

function Navigation(props: {notifications: Array<NotificationData>, showNotifications: () => void}) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="text">
          {/*<Link to="/home">*/}
            <i className="nav-home fa-solid fa-house"></i>
          {/*</Link>*/}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title={<span><i className="nav-home fa-regular fa-user"></i></span>}>
              <NavDropdown.Item href="#action/3.1">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span><i className="nav-home fa-solid fa-bars"></i></span>}
                         id="collasible-bars-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Stuff
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text>
              {props.notifications.length === 0 &&
                <>
                  <i className="nav-home fa-solid fa-bell-slash"></i>
                </>
              }
              {props.notifications.length > 0 &&
                <>
                  <span style={{cursor: "pointer"}} onClick={() => props.showNotifications()}>
                    <i className="nav-home fa-solid fa-bell"></i>
                    <Badge bg={"warning"}>{props.notifications.length}</Badge>
                  </span>
                </>
              }
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;