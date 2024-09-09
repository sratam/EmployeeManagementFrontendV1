import Table from "react-bootstrap/Table";
import { Pagination } from "react-bootstrap";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../App";
import axios from "axios";

import { formatDate } from "../helpers/DateConvertor";
import Loading from "../Components/Loading";

function Employees() {
  const { token, role } = useContext(LoginContext);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false);  

  useEffect(() => {
    const fetchData = () => {
      // const url = `/api/${attach}`;
      const url = `/api/paged?size=15&page=${page}`;
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          setData(res.data.content);
          setTotalPages(res.data.total_pages);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    };
    fetchData();
  }, [token, page]);

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const pageRenderer = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item 
        key={i} 
        active={i === page + 1}
        onClick={() => setPage(i-1)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  if(loading){
    return <Loading/>
  }

  return (
    <div>
      <h3 className="my-2">List of All Employees</h3>
      {/* <p>{"Page Number :" + page}</p>
      <p>{"Total Number Pages:" + totalPages}</p> */}
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
            <tr
              key={item.eid}
              onClick={() => navigate(`/editemployee/${item.eid}`)}
              style={{ cursor: "pointer" }}
            >
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

      <Pagination style={{"float":"right"}}>
        <Pagination.First onClick={() => setPage(0)} />
        <Pagination.Prev
          onClick={() =>
            setPage((prev) => {
              if (prev == 0) return 0;
              return prev - 1;
            })
          }
        />
        {pageRenderer()}
        <Pagination.Next
          onClick={() =>
            setPage((prev) => {
              if (prev == totalPages - 1) return totalPages - 1;
              return (prev += 1);
            })
          }
        />
        <Pagination.Last onClick={() => setPage(totalPages - 1)} />
      </Pagination>
    </div>
  );
}

export default Employees;
