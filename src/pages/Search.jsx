import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  Table,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import axios from "axios";
import { formatDate } from "../helpers/DateConvertor";
import Loading from "../Components/Loading";

function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [loading,setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const sortEmployeesBySalary = () => {
    const sortedEmployees = [...data].sort((a, b) => {
      if (!ascending) {
        let temp = a;
        a = b;
        b = temp;
      }
      return a.salary - b.salary;
    });

    setData(sortedEmployees);
  };

  const reverseEmployees = () => {
    const employees = [...data].reverse();
    setData(employees);
  };

  const sortByHireDate=() => {
    const employees = [...data].sort((a, b) => {
      if (!ascending) {
        let temp = a;
        a = b;
        b = temp;
      }
      const dateA = new Date(a.hireDate);
      const dateB = new Date(b.hireDate);
      return dateA - dateB;
    });
    setData(employees)
  }

  useEffect(() => {
    const fetchData = () => {
      if (query == "") {
        setData([]);
        return;
      }
      const url = `/api/search/${query}`;
      setLoading(true);
      axios
        .get(url)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [query]);



  return (
    <>
      <div className="d-flex my-4 justify-content-between">
        <Form className="w-50">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={handleInputChange}
          />
        </Form>
        <div className="d-flex gap-2  ">
          <Button
            onClick={() => {
              reverseEmployees();
              setAscending((prev) => !prev);
            }}
            variant="secondary"
          >
            {ascending ? (
              <GoArrowUp
                size={24}
                className="align-self-center cursor-pointer"
              />
            ) : (
              <GoArrowDown
                size={24}
                className="align-self-center cursor-pointer"
              />
            )}
          </Button>
          <DropdownButton as={ButtonGroup} title="Sort By">
            <Dropdown.Item as={Button} onClick={() => sortEmployeesBySalary()}>
              Salary
            </Dropdown.Item>
            <Dropdown.Item as={Button} onClick={() => sortByHireDate()}>Joining Date</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      {loading?<Loading/>: (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.eid}>
                <td>{item.eid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.salary}</td>
                <td>{formatDate(item.hireDate)}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Search;
