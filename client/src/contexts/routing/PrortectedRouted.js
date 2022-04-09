import React from "react";
import { useContext } from "react";
import { AuthContext } from "../authContext";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavbarMenu from "../../component/layout/NavbarMenu";
function PrortectedRouted({ component: Component, ...rest }) {
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div>
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            {" "}
            <NavbarMenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrortectedRouted;
