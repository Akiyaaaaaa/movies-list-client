import { Form, Button } from "react-bootstrap";
import "./Login.css";

const LoginForm = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-center">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="mb-3">
          <p className="small">
            <a className="text-primary" href="#!">
              Forgot password?
            </a>
          </p>
        </div>
        <div className="d-grid">
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </>
  );
};
export default LoginForm;
