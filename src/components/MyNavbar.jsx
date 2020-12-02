import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


export default function MyNavbar() {
  const history = useHistory();
  const [myQuestions, setMyQuestions] = useState(false);
  const [myAnswers, setMyAnswers] = useState(false);
  const [dashboard, setDashBoard] = useState(true);
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
      {localStorage.getItem('id')!=undefined?<Button variant="primary" style={{marginLeft:"8px"}} onClick={()=>localStorage.clear()}>Logout</Button>:
      <Button variant="primary" style={{marginLeft:"8px"}} onClick={()=> history.push("/login")}>Login</Button>
      }
    </Navbar>
  </div>
  );
}
