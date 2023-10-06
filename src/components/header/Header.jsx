import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../service/auth.service";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.logout();
      if (!res) {
        console.log("Logout successfull");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <div className="d-flex justify-content-start align-items-center">
            <Navbar.Brand href="/" style={{ color: "gold" }}>
              <FontAwesomeIcon icon={faClapperboard} />
              Watch
            </Navbar.Brand>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <Navbar.Brand id="navbarScroll">
              {user ? (
                <Button
                  variant="outline-info"
                  className="me-2"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <NavLink to="/auth/login">
                    <Button variant="outline-info" className="me-2">
                      Sign In
                    </Button>
                  </NavLink>
                  <NavLink to="/auth/signup">
                    <Button variant="outline-info">Join Us</Button>
                  </NavLink>
                </>
              )}
            </Navbar.Brand>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
