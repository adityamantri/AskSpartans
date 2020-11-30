import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Button, Form, Jumbotron, Alert } from "react-bootstrap";
import "../style/Newquestion.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import MyNavbar from "./MyNavbar";
import axios from "axios";
import { SERVERIP } from "../config";
import { useHistory } from "react-router-dom";

export default function Newquestion() {
  const [tags, setTags] = useState([]);
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [loginMessage, setLoginMessage] = useState(<></>);
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();

    if (!localStorage.getItem("id")) {
      setLoginMessage(
        <Alert variant="danger">
          Please{" "}
          <Alert.Link
            style={{ cursor: "pointer" }}
            href="/login"
            target="_blank"
          >
            {" "}
            Login
          </Alert.Link>{" "}
          to Continue
        </Alert>
      );
      return;
    }

    let req = {
      title: title,
      questionText: body,
      askedBy: {name:localStorage.getItem('name'),id:localStorage.getItem('id')},
      tags: tags,

    };
    setLoginMessage(
      <Alert variant="info">Please wait while we post your question</Alert>
    );

    console.log('HERE IN THE ASK QUESTIONS')
    axios.post(SERVERIP + "/ask", req).then((res) => {
      if (res.status === 200) {
        console.log('HERE IN THE ASK QUESTIONS SUCCESS')
        setLoginMessage(
          <Alert variant="info">Successfully posted Question</Alert>
        );
        console.log(res.data);
        // history.push("/loadQuestion");
      }
    });
  }

  return (
    <div className="d-flex flex-column">
      <MyNavbar />
      <div className="newparent mx-auto">
        {/* <Sidebar /> */}
        <div className="newQuestionContainer">
          <h1>Ask Spartans</h1>
          {/* <loginMessage/> */}
          {loginMessage}

          <Form onSubmit={handleSubmit}>
            <div className="askbox">
              <Jumbotron className="jumbo">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <b>Title</b>
                    <Form.Text style={{ fontSize: "12px", margin: "0 0 0 0" }}>
                      Be specific and imagine you’re asking a question to
                      another person
                    </Form.Text>
                  </Form.Label>
                  <Form.Control
                    style={{ marginTop: 0 }}
                    type="text"
                    size="sm"
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    required
                    placeholder="When does SJSU spring semester begins"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <b>Body</b>
                    <Form.Text style={{ fontSize: "12px", margin: "0 0 0 0" }}>
                      Include all the information someone would need to answer
                      your question
                    </Form.Text>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    onChange={(e) => {
                      setbody(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox"></Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <b>Tags</b>
                    <Form.Text style={{ fontSize: "12px", margin: "0 0 0 0" }}>
                      Add up to 5 tags to describe what your question is about
                    </Form.Text>
                  </Form.Label>

                  <ReactTagInput
                    tags={tags}
                    placeholder="Type and press enter"
                    maxTags={5}
                    editable={true}
                    readOnly={false}
                    removeOnBackspace={true}
                    onChange={(newTags) => setTags(newTags)}
                    //   validator={(value) => {
                    //     // Don't actually validate e-mails this way
                    //     const isEmail = value.indexOf("@") !== -1;
                    //     if (!isEmail) {
                    //       alert("Please enter an e-mail address");
                    //     }
                    //     // Return boolean to indicate validity
                    //     return isEmail;
                    //   }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox"></Form.Group>
              </Jumbotron>
            </div>

            <Button variant="warning" className="askbutton" type="submit">
              Submit Question
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
