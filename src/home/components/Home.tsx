import React from "react";
import '../style/home.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
  // @ts-ignore
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
