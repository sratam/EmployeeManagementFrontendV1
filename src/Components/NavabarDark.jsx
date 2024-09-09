import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import axios from "axios";

function NavabarDark() {
  const { token, setToken,setRole } = useContext(LoginContext);
  const handleLogOut = () => {
    setToken("");
    setRole("");
    axios.defaults.headers.common["Authorization"] = "";
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          Birdi
        </Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link as={NavLink} to={"/home"}>
            Home
          </Nav.Link> */}
          <Nav.Link as={NavLink} to={"/employees"}>
            Employees
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/search"}>
            Search
          </Nav.Link>
          {token ? (
            <Nav.Link as={NavLink} to={"/home"} onClick={() => handleLogOut()}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to={"/login"}>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavabarDark;
