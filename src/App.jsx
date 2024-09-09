import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'

import NavabarDark from './Components/NavabarDark'

import { createContext } from 'react'
import { Container } from 'react-bootstrap'

import Home from './pages/Home'
import Employees from './pages/Employees'
import AddEmployee from './pages/AddEmployee'
import Search from './pages/Search'
import EditEmployee from './pages/EditEmployee'
import Login from './pages/Login'
import Protect from './pages/Protect'


import useLocalStorage from './hooks/useLocalStorage'
import axios from 'axios'
import Scribble from './pages/Scribble'
import Loading from './Components/Loading'

export const LoginContext = createContext();

function App() {
  const [token,setToken] = useLocalStorage("token");
  const [role,setRole] = useLocalStorage("role");

  // axios.defaults.baseURL = 'http://localhost:8080/EmployeeBackend';
  axios.defaults.baseURL = 'http://localhost:8081';

  if(token){
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  


  return (
    <>
    <LoginContext.Provider value={{token,setToken,role,setRole}}>
    <BrowserRouter>
      <NavabarDark/>
      <Container>
      <Routes>
        <Route path='/' element={<Scribble/>} />
        <Route path='/loading' element={<Loading/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/employees' element={<Protect componentProp={Employees}/>}/>
        <Route path='/allemployees' element={<Protect componentProp={Employees} />}/>
        <Route path='/addemployee' element={<Protect componentProp={AddEmployee}/>}/>
        <Route path='/search' element={<Protect componentProp={Search}/>} />
        <Route path='/editemployee/:id' element={<Protect componentProp={EditEmployee}/>} />
      </Routes>
      </Container>
    </BrowserRouter>
    </LoginContext.Provider>
    
    </>
  )
}

export default App
