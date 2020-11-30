import React, { useState } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

export default function MyNavbar() {

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
      <Button variant="primary" style={{marginLeft:"8px"}} onClick={()=>localStorage.clear()}>Logout</Button>
    </Navbar>
  </div>
  );
}
