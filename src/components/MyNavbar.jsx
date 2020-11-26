import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

export default function MyNavbar() {
  return (
    <div className="navContainer">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/dashboard">Ask Spartans</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">My Questions</Nav.Link>
          <Nav.Link href="#features">My Answers</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="#pricing">My Account</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}
