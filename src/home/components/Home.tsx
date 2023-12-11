import React from "react";
import '../style/home.css';
import {Navigate} from "react-router-dom";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {shouldRedirect} from "../../utils/util";

const Home = () => {
  // TODO there has to be a better way than repeating the following
  // in every component. Watch the react security pluralsight video(s)
  const redirectTo = shouldRedirect();
  if (redirectTo) {
    return (
      <Navigate to={redirectTo} replace={true} />
    )
  }
  return (
    <div>
      <br/>
      <h1>Welcome to Texas TOC</h1>
      <p>
        <Link to="/current-game">
          <Button variant="outline-secondary"> Game </Button>
        </Link>
      </p>
    </div>
  )
}

export default Home;
