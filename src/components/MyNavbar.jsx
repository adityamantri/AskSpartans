import React, { useState } from "react";
import { useEffect } from "react";
import { Nav, Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function MyNavbar() {
  const history = useHistory();
  const [loginStatus, setLoginStatus] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (localStorage.getItem("id") == undefined) {
      setLoginStatus(false);
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
          <Nav.Link href="/analytics">Analytics</Nav.Link>
          <Button variant="primary"  size="sm" onClick={handleShow}>
            ChatBot
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ask your questions to Spartans Chatbot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <iframe
                src="https://webchat.botframework.com/embed/askspartans-bot?s=U6EhqwwtQuc.0t84HPVKMeIkze38H-ka6ytKJwTCT44lsxNaFsdTFVs"
                style={{minWidth: "400px", width: "100%", minHeight: "500px"}}
              ></iframe>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* <Nav.Link href="#pricing">My Account</Nav.Link> */}
        </Nav>
        {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
        
      </Form> */}
        {localStorage.getItem("id") != undefined ? (
          <Button
            variant="primary"
            style={{ marginLeft: "8px" }}
            onClick={() => {
              localStorage.clear();
              setLoginStatus(!loginStatus);
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ marginLeft: "8px" }}
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        )}
      </Navbar>
    </div>
  );
}
