import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../service/auth.service";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);

      if (response.body.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      } else {
        console.error("Token is missing in the response.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="text-center">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="mb-3">
          <p className="small">
            <a className="text-primary" href="/">
              Back to home?
            </a>
          </p>
        </div>
        <div className="d-grid">
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Sign In
          </Button>
        </div>
      </Form>
    </>
  );
};
export default LoginForm;
