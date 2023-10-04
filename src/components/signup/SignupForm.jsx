import { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../../service/auth.service";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "user",
  });
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setPasswordsMatch(false);
      window.alert("Passwords do not match");
      return;
    }
    authService
      .register(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      )
      .then((response) => {
        console.log("Registration successful:", response);
        window.alert("Registration successful");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <>
      <>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formUsername">
              <Form.Label className="text-center">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formUsername">
              <Form.Label className="text-center">Email address</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                placeholder="Confirm your password"
                value={formData.confirm}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                onClick={handleFormSubmit}
              >
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
