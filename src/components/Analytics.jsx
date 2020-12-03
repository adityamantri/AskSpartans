import { Doughnut, Bar, Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Button, Form, Jumbotron, Alert } from "react-bootstrap";
import "../style/Newquestion.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import MyNavbar from "./MyNavbar";
import axios from "axios";
import { SERVERIP } from "../config";
import { useHistory } from "react-router-dom";


// let  donutOptions2 = {
//     tooltips: {
//       callbacks: {
//         label(tooltipItems, data) {
//           return data.datasets[0].data[tooltipItems.index] == 0? `${data.labels[tooltipItems.index]}` :`${data.labels[tooltipItems.index]} : ${
//             data.datasets[0].data[tooltipItems.index]
//             } Scripts`;
//         }
//       }
//     },
//     responsive: true,
//     maintainAspectRatio: true,
//     legend: {
//       display: true
//     }
//   }
export default function Analytics() {
  const [donut, setDonut] = useState({});
  const [donut2, setDonut2] = useState({});

  const [loginMessage, setLoginMessage] = useState(<></>);
  let history = useHistory();
  
  useEffect(() => {
    let data2 = {}
    let data = {}
    axios.get(SERVERIP + "/loadTopTag").then((res) => {
        if (res.status === 200) {
          //setData(res.data.questions);
          // const listItems = res.data.questions;
  
          // setquestions(listItems);
          console.log('Res data', res.data.questions)
          data = {
            labels: res.data.questions.lables,
            datasets: [
                {
                  
                  fill: false,
                  data: res.data.questions.data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                  ],
                }
              ]
        }

        axios.get(SERVERIP + "/loadTopQuestions").then((res) => {
            if (res.status === 200) {
              //setData(res.data.questions);
              // const listItems = res.data.questions;
      
              // setquestions(listItems);
              console.log('Res data', res.data.questions)
          data2 = {
            labels: res.data.questions.lables,
            datasets: [
                {
                  label: "Top 5 questions",
                  fill: false,
                  data: res.data.questions.data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                  ],
                }
              ]
        }
        setDonut(data)
        setDonut2(data2)
            } else {
              console.log("failure in loading data");
            }
            console.log(res.status, res.data);
            //setLoad(false)
          });
       

        } else {
          console.log("failure in loading data");
        }
        console.log(res.status, res.data);
        // setLoad(false)
      });

    return () => {};
  }, []);
  


  return (
    <div className="d-flex flex-column">
      <MyNavbar />
      <div className="newparent mx-auto">
        {/* <Sidebar /> */}
        <div className="newQuestionContainer">
          <h1 style={{textAlign:'center'}}>Analytics</h1>
          {/* <loginMessage/> */}
          {loginMessage}
        <div className="newDashboardContainer">
        <h2 style={{textAlign:'center'}}>Top 5 tags</h2>
          <Doughnut
                      data={donut}
                      width={400}
                      
                      
            />
             <h2 style={{textAlign:'center', marginTop:'40px'}}>Top 5 Questions</h2>
             <Line
                      data={donut2}
                      width={400}
                      
                      
            />
</div>
        </div>
      </div>
    </div>
  );
}
