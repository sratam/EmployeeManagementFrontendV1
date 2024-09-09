import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, Alert } from "react-bootstrap";
import axios from "axios";

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    salary: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    const { name, email, role, status, salary } = formData;
    if (!name || !email || !role || !status || !salary) {
      setErrorMessage("All fields are required.");
      return false;
    }
    setErrorMessage(""); // Clear error message if all fields are filled
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log(formData);
    axios
      .post("/api/add", formData)
      .then((res) => {
        console.log(res.data);
        setSuccessMessage("Employee Added");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <br />
      <h3>Add Employee</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="role"
            placeholder="Enter role"
            value={formData.role}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            name="salary"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </Form.Group>
        {successMessage.length ? (
          <Alert variant="success">{successMessage}</Alert>
        ) : (
          <p></p>
        )}
        {errorMessage.length ? (
          <Alert variant="danger">{errorMessage}</Alert>
        ) : (
          <p></p>
        )}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddEmployee;
