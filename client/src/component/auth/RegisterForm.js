import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import AlertMessage from "../layout/AlertMessage";
function RegisterForm(props) {
  const [registerForm, setRegisterForm] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({ type: null, message: null });
  const { registerUser } = useContext(AuthContext);

  const onchangeValueRegister = (event) => {
    event.preventDefault();
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  // vẫn chưa có validate from cẩn thận trong thực tế
  async function register(e) {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setAlert({ type: "danger", message: "password do not match" });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        return;
      }
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
      setRegisterForm({ userName: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.log(error);
    }
  }
  const { userName, password, confirmPassword } = registerForm;
  return (
    <>
      <AlertMessage info={alert} />
      <Form onSubmit={register}>
        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="username"
            name="userName"
            value={userName}
            onChange={onchangeValueRegister}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onchangeValueRegister}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onchangeValueRegister}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          register
        </Button>
      </Form>{" "}
      <p>don't have an account ? </p>
      <Link to="/login">
        <Button variant="info" size="sm" className="ml-2">
          login
        </Button>
      </Link>
    </>
  );
}

export default RegisterForm;
