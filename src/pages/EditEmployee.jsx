import { useEffect, useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";


import axios from "axios";
import Loading from "../Components/Loading";

function EditEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    salary: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading,setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const url = `/api/${id}`;
    axios
      .get(url)
      .then((res) => {
        setLoading(true);
        setFormData(res.data)})
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [id]);

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
    setLoading(true);
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const url = `/api/update/${id}`;
    axios
      .patch(url, formData)
      .then((res) => {
        console.log(res.data);
        setSuccessMessage("Updated Successfully");
      })
      .catch((err) =>{
        if(err.response.status == 401){
          setErrorMessage("You are not authorized to perform this operation")
        }else{
          setErrorMessage("Some Error has Occured")
        }
      })
      .finally(() => setLoading(false));
  };

  if(loading){
    return <Loading/>
  }

  return (
    <div>
      <h3 className="my-2">Edit Employee Details</h3>
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

export default EditEmployee;
