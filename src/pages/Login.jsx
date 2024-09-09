import { useState, useContext } from "react";
import { Form, Alert, Button , Spinner} from "react-bootstrap";
import axios from "axios";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/birdi_systems_logo.png";

function Login() {
  const handleSubmit = (e) => {
    const url = "/users/login";
    e.preventDefault();
    if (username == "" || password == "") {
      setError("Please fill Username and Password");
      return;
    }
    setLoading(true);
    axios
      .post(url, {
        username,
        password,
      })
      .then((res) => {
        setToken(res.data.token);
        setRole(res.data.role);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        navigate("/employees");
      })
      .catch((err) => {
        setError("Invalid Username or Password");
        console.log(err)
      }).finally(() => setLoading(false));
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken, setRole } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: 'calc(100vh - 56px)'}}>
      <div style={{transform:"translateY(-25%)"}}>
        <img src={Logo} alt="Birdi Inc" width={300} className="mb-2" />
        <h4>Welcome to Birdi Inc </h4>
        <p>
          We're happy to have you. Sign in to access your company's workspace.
        </p>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onChange={handleUsernameChange}/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" 
      disabled={loading}
      onClick={(e) => handleSubmit(e)}
      type="submit"  style={{ width: '100px' }}>
      {loading?<Spinner animation="border" />:"Submit"}
      </Button>
    </Form>
      </div>
    </div>
  );
}

export default Login;
