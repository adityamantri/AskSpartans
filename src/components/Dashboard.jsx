import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Button } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import "../style/Dashboard.css";
import { SERVERIP } from "../config";

export default function Dashboard() {
  const [questions, setquestions] = useState(null);
  useEffect(() => {
    axios.get(SERVERIP + "/loadQuestions").then((res) => {
      if (res.status === 200) {
        const listItems = res.data.questions.map((item) => {
          return (
            <div key={item._id}>
              <div className="questionBox d-flex flex-row">
                <div className="questionBox-left">
                    <div className="votes">
                        <div className="count">
                            <span>{item.votes ? item.votes : 0}</span>
                        </div>
                        <div>
                            votes
                        </div>
                    </div>
                    <div className="statusAnswered votes">
                        <div className="count">
                            <span>{item.answers ? item.answers.length : 0}</span>
                        </div>
                        <div>
                            answers
                        </div>
                    </div>
                </div>
                <div className="questionBox-right">
                    <h3><a href="/question" className="question-title"> {item.title} </a></h3>
                    <div>
                        {item.tags.map((element) => {
                            return <Badge className="tag-badge" variant="warning"> {element} </Badge>
                        })
                        }
                    </div>
                </div>
              </div>
            </div>
          );
        });

        setquestions(listItems);
      } else {
        console.log("failure in loading data");
      }
      console.log(res.status, res.data);
    });
    return () => {};
  }, []);
  return (
    <div>
      <MyNavbar />
      <div>
        <div className="headline">
          <div>
            <h3>Top Questions</h3>
          </div>
          <div>
            <Button variant="warning" href="/askQuestion">
              Ask Question
            </Button>
          </div>
        </div>
        <div className="questionList">{questions}</div>
      </div>
    </div>
  );
}
