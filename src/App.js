import "./App.css";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Newquestion from "./components/Newquestion";
import Dashboard from "./components/Dashboard";
import Question from "./components/Question";
import MyQuestions from "./components/MyQuestions";
import MyAnswers from "./components/MyAnswers";

function App() {
  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/askQuestion" exact component={Newquestion} />
        <Route path="/myQuestions" exact component={MyQuestions} />
        <Route path="/myAnswers" exact component={MyAnswers} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/question/:id" exact component={Question}/>
    </Router>
  );
}

export default App;
