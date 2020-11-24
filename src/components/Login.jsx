import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { SERVERIP } from "../config";
import { image } from "../logo";
import axios from 'axios';

import "../style/Login.css";

export default function Login() {
  let history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    let req = {
      email: email,
      password: password
    }
    axios.post(SERVERIP+"/login", req)
    .then(res => {
      if(res.status === 200) {
        console.log(res.data);
        localStorage.setItem("id", res.data.id)
        history.push('/dashboard')
      }else{
        console.log(res.status);
      }
    }).catch(err=> console.log(err));
  }
  return (
    <div className="loginparent">
      <img src={image} alt="SJSU"/>
      <div className="loginContainer">
        <h1>Welcome to Ask Spartans</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            onChange={(e) => setpassword(e.target.value)} placeholder="Password" required />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox"></Form.Group>
          <div className="spartanButton">
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <Form.Text className="text-muted">
        Does not have an account <a href="/signUp">Signup</a>
      </Form.Text>
    </div>
  );
}
