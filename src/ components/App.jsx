import React from "react";
import Home from "./Home";
import Results from "./Results";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center bkg">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/result" component={Results}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
