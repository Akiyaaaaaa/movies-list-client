import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const SignupForm = () => {
  return (
    <>
      <>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formUsername">
              <Form.Label className="text-center">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formUsername">
              <Form.Label className="text-center">Email address</Form.Label>
              <InputGroup>
                <Form.Control type="email" placeholder="Enter email" />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Row>
        </Form>
      </>
    </>
  );
};
export default SignupForm;
