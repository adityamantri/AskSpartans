import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Button } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import "../style/Dashboard.css";
import { SERVERIP } from "../config";
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export default function Dashboard() {
  let history = useHistory();
  const [questions, setquestions] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(SERVERIP + "/loadQuestions").then((res) => {
      if (res.status === 200) {
        setData(res.data.questions);
        // const listItems = res.data.questions;

        // setquestions(listItems);
      } else {
        console.log("failure in loading data");
      }
      console.log(res.status, res.data);
    });
    return () => {};
  }, []);

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data.slice(offset, offset + PER_PAGE).map((item) => {
    return (
      <div key={item._id}>
        <div className="questionBox d-flex flex-row">
          <div
            className="questionBox-left"
            onClick={() => history.push("/question/" + item._id)}
          >
            <div className="votes">
              <div className="count">
                <span>{item.votes ? item.votes : 0}</span>
              </div>
              <div>votes</div>
            </div>
            <div className="statusAnswered votes">
              <div className="count">
                <span>{item.answers ? item.answers.length : 0}</span>
              </div>
              <div>answers</div>
            </div>
          </div>
          <div className="questionBox-right">
            <h3>
              <a href={"/question/" + item._id} className="question-title">
                {" "}
                {item.title}{" "}
              </a>
            </h3>
            <div>
              {item.tags.map((element) => {
                return (
                  <Badge className="tag-badge" variant="warning">
                    {" "}
                    {element}{" "}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  });
  const pageCount = Math.ceil(data.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  return (
    <div>
      <MyNavbar />
      <div className="container">
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
        {/* <div className="questionList">{questions}</div> */}
        <div className="questionList">
          
          {currentPageData}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </div>
  );
}
