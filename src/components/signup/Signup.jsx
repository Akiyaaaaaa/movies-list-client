import { Container, Row, Col, Card } from "react-bootstrap";
import "./Signup.css";
import authBg from "../../assets/authBg.png";

import SignupForm from "./SignupForm";
const Signup = () => {
  return (
    <>
      <div
        className="bgimage"
        style={{ backgroundImage: `url(${authBg})` }}
      ></div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                  <p className=" mb-5 text-center">
                    Please enter your details to join us!
                  </p>
                  <SignupForm />
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <a href="/auth/login" className="text-primary fw-bold">
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
