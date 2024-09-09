import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function LoginV2() {
  return (
    
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg" style={cardStyle}>
            <Card.Body>
              <h3 className="text-center mb-4" style={headerStyle}>
                Welcome Back!
              </h3>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label style={labelStyle}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    style={inputStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-4">
                  <Form.Label style={labelStyle}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    style={inputStyle}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={buttonStyle}
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-4">
                <a href="#" style={linkStyle}>
                  Forgot password?
                </a>
              </div>
              <hr />
              <div className="text-center">
                <Button
                  variant="outline-primary"
                  className="w-100"
                  style={outlineButtonStyle}
                >
                  Sign Up
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

  );
}

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffefd5", // Pale color background
  backgroundImage:
    "radial-gradient(circle, #ffcccb 10%, transparent 10%), radial-gradient(circle, #add8e6 10%, transparent 10%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 10px 10px",
};

const cardStyle = {
  borderRadius: "15px",
  borderColor: "#d2691e",
  backgroundColor: "#fff8dc",
  borderWidth: "2px",
};

const headerStyle = {
  fontFamily: '"Comic Sans MS", cursive, sans-serif',
  color: "#d2691e",
  textShadow: "2px 2px #ffcccb",
};

const labelStyle = {
  color: "#d2691e",
  fontFamily: '"Courier New", Courier, monospace',
  fontWeight: "bold",
};

const inputStyle = {
  borderRadius: "5px",
  backgroundColor: "#ffefd5",
  borderColor: "#d2691e",
  color: "#333",
};

const buttonStyle = {
  backgroundColor: "#d2691e",
  borderColor: "#d2691e",
  fontFamily: '"Courier New", Courier, monospace',
  fontWeight: "bold",
  borderRadius: "5px",
  textShadow: "1px 1px #fff8dc",
};

const linkStyle = {
  color: "#d2691e",
  fontFamily: '"Courier New", Courier, monospace',
  textDecoration: "none",
  fontWeight: "bold",
};

const outlineButtonStyle = {
  borderColor: "#d2691e",
  color: "#d2691e",
  fontFamily: '"Courier New", Courier, monospace',
  fontWeight: "bold",
  borderRadius: "5px",
  textShadow: "1px 1px #fff8dc",
};

export default LoginV2;
