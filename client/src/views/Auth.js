import LoginForm from "../component/auth/LoginForm";
import RegisterForm from "../component/auth/RegisterForm";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
function Auth({ authRoute }) {
  let body;
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);
  if (authLoading) {
    //logic
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
    } else {
      body = (
        <>
          {authRoute === "login" && <LoginForm />}
          {authRoute === "register" && <RegisterForm />}
        </>
      );
    }
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>learnit</h1>
          <p>Keep track of what are you learnit</p>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
