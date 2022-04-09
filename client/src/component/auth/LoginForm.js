import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import AlertMessage from "../layout/AlertMessage";
function LoginForm(props) {
  const [userForm, setUserForm] = useState({
    userName: "",
    password: "",
  });
  const [alert, setAlert] = useState({ type: null, message: null });
  const { loginUser } = useContext(AuthContext);

  const onchangeValueLogin = (event) => {
    event.preventDefault();
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
  };

  const { userName, password } = userForm;

  async function login(e) {
    let timer;
    try {
      e.preventDefault();
      let loginData;
      if (userName && password) {
        loginData = await loginUser(userForm);
      }
      if (loginData?.success) {
      } else {
        setAlert({ type: "danger", message: "đăng nhập thất bại" });
        timer = setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
      setUserForm({ userName: "", password: "" });
    } catch (error) {
      console.log(error);
    }
    return () => clearTimeout(timer);
  }

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert}></AlertMessage>
        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="username"
            name="userName"
            value={userName}
            onChange={onchangeValueLogin}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={onchangeValueLogin}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          login
        </Button>
      </Form>{" "}
      <p>don't have an account ? </p>
      <Link to="/register">
        <Button variant="info" size="sm" className="ml-2">
          Register
        </Button>
      </Link>
    </>
  );
}

export default LoginForm;
