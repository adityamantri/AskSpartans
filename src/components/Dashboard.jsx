import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Button, Form, FormControl, Alert, Spinner } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import "../style/Dashboard.css";
import { SERVERIP } from "../config";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Dashboard() {
  let history = useHistory();
  const [questions, setquestions] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [isTag, setTag] = useState(false);
  const [isText, setText] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    axios.get(SERVERIP + "/loadQuestions").then((res) => {
      if (res.status === 200) {
        setData(res.data.questions);
        // const listItems = res.data.questions;

        // setquestions(listItems);
      } else {
        console.log("failure in loading data");
      }
      console.log(res.status, res.data);
      setLoad(false)
    });
    return () => {};
  }, []);

  const onSearch=()=>{

    console.log('Tag', isTag,'text', isText, 'Search Text', searchText)

    if(!isTag && !isText)
    {
      alert('Please specify search crieteria!')
      return
    }

  let type = isTag?'tags':'text'
  let reqBody = {
    type:type,
    searchQuery : searchText
  }  

    setLoad(true)
    axios.post(SERVERIP + "/search", reqBody).then((res) => {
      if (res.status === 200) {
        setData(res.data.questions);
        // const listItems = res.data.questions;

        // setquestions(listItems);
      } else {
        console.log("failure in loading data");
      }
      console.log(res.status, res.data);
      setLoad(false)
    });

  }

  const clearSearch = ()=>{
    setSearchText('')
    setTag(false)
    setText(false)
    setLoad(true)
    axios.get(SERVERIP + "/loadQuestions").then((res) => {
      if (res.status === 200) {
        setData(res.data.questions);
        // const listItems = res.data.questions;

        // setquestions(listItems);
      } else {
        console.log("failure in loading data");
      }
      console.log(res.status, res.data);
      setLoad(false)
    });
  }

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
          <div className="questionBox-right w-100">
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
            <div className="d-flex flex-row-reverse ">
              <p className="border border-primary rounded p-2 text-primary font-italic bg-light">
                Asked on: {item.postDate} <br />
                Asked by:
                {item.askedBy && item.askedBy.name
                  ? " "+item.askedBy.name
                  : null}{" "}
              </p>{" "}
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
   load ? <div style={{display:"flex", flexDirection:'row', alignContent:'center' ,justifyContent:'center'}}>
     <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading Questions...
  </Button>
    </div> : <div>
      <MyNavbar />
      <div className="container">
      <div className='searchContainer'>
          <Form inline>
          <FormControl type="text" placeholder="Search"  value={searchText}   onChange={(e) => {
                      setSearchText(e.target.value);
                    }} className="mr-sm-2" />
          <Form.Check
          custom
          inline
          label="By Tag"
          type='checkbox'
          id = 'tags'
          checked={isTag}
          onChange={()=>{
            setTag(!isTag)
            setText(false)
          }}
      />
      <Form.Check
          custom
          inline
          label="By Text"
          type='checkbox'
          id = 'text'
          checked={isText}
          onChange={()=>{
            setText(!isText)
            setTag(false)
          }}
      />
          <Button variant="outline-primary" onClick={onSearch}>Search</Button>
          <Button variant="primary" style={{marginLeft:'10px'}} disabled={searchText.length==0?true:false} onClick={clearSearch}>Clear Search</Button>
        </Form>
          </div>
     { data.length!=0?<div className="headline">
      
          <div>
            <h3>Top Questions</h3>
          </div>
          <div>
            <Button variant="warning" href="/askQuestion">
              Ask Question
            </Button>
          </div>
        </div>:<div className="headline">
      
      <div>
        <h3>No questions found!</h3>
      </div>
   
    </div>}
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
