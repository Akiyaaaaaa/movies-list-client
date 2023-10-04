import LoginForm from "./LoginForm";
import "./Login.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import authBg from "../../assets/authBg.png";

const Login = () => {
  return (
    <>
      <div
        className="bgimage"
        style={{ backgroundImage: `url(${authBg})` }}
      ></div>
      <Container>
        <Row className="auth">
          <Col md={8} lg={6} xs={12}>
            <Card style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)" }}>
              <Card.Body>
                <div className="auth-container">
                  <h2 className="auth-title text-center">Sign In</h2>
                  <p className="text-center">
                    Lorem ipsum dolor set amet puja kerang ajaib
                  </p>
                  <LoginForm />
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don&apos;t have an account?{" "}
                      <a href="/auth/signup" className="text-primary fw-bold">
                        Sign Up
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
export default Login;
