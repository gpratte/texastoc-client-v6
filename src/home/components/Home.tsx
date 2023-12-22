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
      <p>The stuff you are most interested in...</p>
      <p>
        <Link to="/season">
          <Button variant="outline-secondary"> Season </Button>
        </Link>
        &nbsp;
        <Link to="/current-game/0">
          <Button variant="outline-secondary"> Game </Button>
        </Link>
      </p>
      <p>The stuff you'll look at from time to time...</p>
      <p>
        <Link to="/players">
          <Button variant="outline-secondary">Players</Button>
        </Link>
      </p>
      <p>The stuff you might look at once...</p>
      <p>
        <Link to="/rounds">
          <Button variant="outline-secondary">Rounds</Button>
        </Link>
        &nbsp;
        <Link to="/points">
          <Button variant="outline-secondary">Points</Button>
        </Link>
      </p>
    </div>
  )
}

export default Home;
