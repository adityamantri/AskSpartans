import React, { useState } from "react";
import { useEffect } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


export default function MyNavbar() {
  const history = useHistory();
  const [loginStatus, setLoginStatus] = useState(false);


  useEffect(() => {
  if(localStorage.getItem('id')==undefined)
  {
    setLoginStatus(false)
  }
    return () => {};
  }, []);

  return (
    <div className="navContainer">
      
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/dashboard">Ask Spartans</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/myQuestions">My Questions</Nav.Link>
        <Nav.Link href="/myAnswers">My Answers</Nav.Link> 
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        {/* <Nav.Link href="#pricing">My Account</Nav.Link> */}
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
        
      </Form> */}
      {localStorage.getItem('id')!=undefined?<Button variant="primary" style={{marginLeft:"8px"}} onClick={()=>{localStorage.clear()
      setLoginStatus(!loginStatus)}}>Logout</Button>:
      <Button variant="primary" style={{marginLeft:"8px"}} onClick={()=> history.push("/login")}>Login</Button>
      }
    </Navbar>
  </div>
  );
}
