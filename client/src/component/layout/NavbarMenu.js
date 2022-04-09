import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logoutIcon from "../../assets/logout.svg";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
function NavbarMenu(props) {
  const {
    authState: { user },
    logout,
  } = useContext(AuthContext);
  function logoutUser() {
    logout();
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="logo"
              height="32"
              width="32"
              className="mr-2"
            />
            Hieu dev
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">dashboard</Nav.Link>
              <Nav.Link href="/about">about</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ margin: "auto" }}>
                {" "}
                xin chào {user.userName}
              </Nav.Link>

              <Button variant="primary" onClick={logoutUser}>
                <img
                  src={logoutIcon}
                  alt="logout icon"
                  height="25"
                  width="25"
                  className="mr-2"
                />
                Đăng xuất
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMenu;
