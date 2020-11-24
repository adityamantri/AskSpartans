import React,{useState} from 'react'
import "../style/Login.css";
import { Form, Button } from "react-bootstrap";
import { SERVERIP } from '../config';
import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import { image } from '../logo';

export default function SignUp() {
    let history = useHistory();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    function handleSubmit(e) {
      e.preventDefault();
      let req = {
        name: name,
        email: email,
        password: password
      }
      axios.post(SERVERIP+"/signup", req)
      .then(res => {
        if(res.status === 201) {
          console.log("Success");

          history.push('/login')
        }else{
          console.log(res.status);
        }
      }).catch(err=> console.log(err))
    }
    return (
        <div>
            <div className="loginparent">
                <img src={image}/>

      <div className="loginContainer">
      <h1>Welcome to Ask Spartans</h1>
        <Form onSubmit={handleSubmit}>
            
          <Form.Group controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e)=> setname(e.target.value)}placeholder="Enter name" required/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="Enter email" required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e)=> setpassword(e.target.value)}placeholder="Password" required/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox"></Form.Group>
          <div className="spartanButton" >
          <Button variant="warning" 
          type="submit">
            Submit
          </Button>
          </div>
        </Form>
        
      </div>
      <Form.Text className="text-muted">
          Already have an account <a href="/login">Sign in</a>
        </Form.Text>
    </div>
        </div>
    )
}