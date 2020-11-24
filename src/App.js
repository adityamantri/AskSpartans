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
import Answers from "./components/Answers";

function App() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/askQuestion" exact component={Newquestion} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/question" exact component={Answers}/>
    </Router>
  );
}

export default App;
