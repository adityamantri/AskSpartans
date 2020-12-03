import React, { useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";
import "../style/Question.css";
import axios from "axios";
import { Badge, Button, Form, Jumbotron, Alert } from "react-bootstrap";
import { SERVERIP } from "../config";
import accept from '../assets/images/accept.png'
import greyaccept from '../assets/images/greyaccept.png'

export default function Question(props) {
  const [questionData, setquestionData] = useState({});
  const [newAnswer, setnewAnswer] = useState("");
  const [loginMessage, setLoginMessage] = useState(<></>);
//   const [votes, setvotes] = useState({});
  useEffect(() => {
    axios
      .get(SERVERIP + "/loadQuestion/" + props.match.params.id)
      .then((res) => {
        console.log('Question Data is =---------->',res.data.question);
        setquestionData(res.data.question);
        // let temp = {};
        // res.data.question.answers.map((ans) => {
        //   temp[ans._id] = ans.upvote - ans.downvote;
        // });
        // setvotes(temp);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

//   useEffect(() => {
//     console.log(votes);
//     return () => {};
//   }, [votes]);

function acceptAnswer(id){
  console.log('In accept answer!!')
  axios
  .put(SERVERIP + "/acceptAnswer", {
    questionID: props.match.params.id,
    answerID: id,
  })
  .then((res) => {
    if (res.status === 200) {
        console.log(res.data);
        window.location.reload();
        //setquestionData(res.data.question)
    //   setvotes(votes => ({ ...votes, id: votes.id + 1 }));
    }
  }).catch(err => console.log(err));
}

  function handleUpvote(id) {
    axios
      .put(SERVERIP + "/upvoteAnswer", {
        questionID: props.match.params.id,
        answerID: id,
        userID: localStorage.getItem("id"),
      })
      .then((res) => {
        if (res.status === 200) {
            console.log(res.data);
            setquestionData(res.data.question)
        //   setvotes(votes => ({ ...votes, id: votes.id + 1 }));
        }
      }).catch(err => console.log(err));
  }

  function handleDownvote(id) {
    axios
      .put(SERVERIP + "/downvoteAnswer", {
        questionID: props.match.params.id,
        answerID: id,
        userID: localStorage.getItem("id"),
      })
      .then((res) => {
        if (res.status === 200) {
            console.log(res.data);
            setquestionData(res.data.question)
        }
      }).catch(err => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!localStorage.getItem("id")) {
      console.log('Test not logged in')
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
    axios
      .post(SERVERIP + "/answerQuestion", {
        questionID: props.match.params.id,
        answer: newAnswer,
        answeredBy: {
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
        },
      })
      .then((res) => {
        console.log("answer post response", res.data);
        window.location.reload()
      });
  }

  return (
    <div>
      <MyNavbar />
      <Jumbotron style={{ padding: "1.3rem 1rem" }}>
        <div className="container">
          <div className="questionHeader">
            <div className="d-flex flex-column">
              <h3>{questionData && questionData.title}</h3>
              <div className="d-flex flex-row">
                <span style={{ fontSize: "14px", marginRight: "2px" }}>
                  Posted Date: {questionData.postDate}
                </span>
              </div>
            </div>
            <div>
              <Button variant="warning" href="/askQuestion">
                Ask Question
              </Button>
            </div>
          </div>

          {/* <div> */}
          {/* <div className="voting d-flex flex-column">
          <i className="fas fa-caret-up"></i>
          
          </div> */}
          <div className="questionBody">
            <div className="qtext">{questionData.questionText}</div>
            <div>
              {" "}
              {questionData.tags &&
                questionData.tags.map((tag) => {
                  return (
                    <Badge variant="warning" style={{ marginRight: "5px" }}>
                      {tag}
                    </Badge>
                  );
                })}
            </div>
            <div className="d-flex flex-row-reverse">
              <Button size="sm" disabled variant="outline-primary">
                Asked by: {questionData.askedBy!=undefined?questionData.askedBy.name:''}
              </Button>
            </div>
          </div>
        </div>
      </Jumbotron>
      <div className="container">
        <div style={{ paddingTop: "20px", paddingBottom: "15px" }}>
          <h5>
            {questionData.answers &&
              (questionData.answers.length > 1
                ? questionData.answers.length + " Answers"
                : questionData.answers.length + " Answer")}{" "}
          </h5>
        </div>
        <div>
          {questionData.answers &&
            questionData.answers.map((ans) => {
              // setvotes({...votes, [ans._id]: ans.upvote - ans.downvote})
              return (
                  <div className="answer">
                <div className="d-flex ">
                  <div className="ansVotes">
                    <Button
                      size="sm"
                      variant="success"
                      block
                      onClick={() => handleUpvote(ans._id)}
                      disabled={!localStorage.getItem("id")}
                    >
                      Up vote
                    </Button>
                    <div style={{ padding: "3px" }}>{ans.upvote - ans.downvote} Votes</div>
                    <Button size="sm" variant="danger" onClick={() => handleDownvote(ans._id)} 
                    disabled={!localStorage.getItem("id")} >
                      Down vote
                    </Button>
                    <div className={questionData.askedBy.id === localStorage.getItem("id") ? "" : "d-none"} >
                        {/* <button className={ans.acceptStatus === "true" ? "bg-success" : ""} style={{marginTop:"2px"}} onClick={()=>acceptAnswer(ans._id)}>Accept</button> */}
                        {/* {isAccepted} */}
                      {/* {ans.acceptStatus === "true" ? "Accepted" : ""} */}
                     {ans.acceptStatus==='true' ? <img style={{marginTop:"2px"}} src={accept} height='40px' width='40px'></img>
                    :(questionData.acceptStatus=='false' ? <img style={{marginTop:"2px"}} src={greyaccept} onClick={()=>acceptAnswer(ans._id)} height='40px' width='40px'></img> : null)
                    }
                    </div>
                  </div>
                  <div>{ans.answer}
                  </div>
                  
                </div>
                <div className="d-flex flex-row-reverse ">
                <p className="border border-primary rounded p-2 text-primary font-italic bg-light">
                  Answered on: {ans.time} <br />
                  Answered by: 
                  {(ans.answeredBy && ans.answeredBy.name)
                    ? " "+ans.answeredBy.name
                    : null}{" "}
                </p>{" "}
              </div>
              </div>
              );
            })}
        </div>
        <div className="answerbox">
        {loginMessage}
          <h5 style={{ paddingBottom: "15px" }}>Your Answer</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              as="textarea"
              rows={6}
              onChange={(e) => {
                setnewAnswer(e.target.value);
              }}
              required
            />

            <Button variant="primary" className="ansbutton" type="submit">
              Post Your Answer
            </Button>
          </Form>
        </div>
      </div>
    </div>
    // </div>
  );
}
