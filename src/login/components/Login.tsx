import React, {useContext} from "react";
import {getToken} from "../../utils/util";
import {Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {Link, Navigate} from "react-router-dom";
import {LeagueContext, LeagueContextType} from "../../league/components/League";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const {toggleLoadingGlobal} = useContext(LeagueContext) as LeagueContextType;
  const {
    login,
  } = useLogin();

  const signIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      emailId: { value: string };
      passwordId: { value: string };
    };
    const email = target.emailId.value;
    const password = target.passwordId.value;
    toggleLoadingGlobal(true);
    login(email, password);
    toggleLoadingGlobal(false);
  }

  if (getToken()) {
    return (
      <Navigate to={"/home"} replace={true} />
    )
  }
  return (
    <div>
      <br/>
      <h2>Please Log In</h2>
      <br/>
      <Form onSubmit={signIn}>
        <Form.Group>
          <Form.Control type="email" id={'emailId'} placeholder="Enter email" />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" id={'passwordId'} placeholder="Password" />
        </Form.Group>
        <Button id="loginSubmitId" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className={'main-p'}><Link to="/login/forgot">
        <Button variant="link">Forgot Password</Button> </Link>
      </p>
    </div>
  )
}

export default Login;
