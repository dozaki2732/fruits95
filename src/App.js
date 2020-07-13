import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import HomePage from "./components/pages/HomePage";
import RecordEntry from "./components/pages/RecordEntry";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home-page" component={HomePage} />
        <Route exact path="/record-entry" component={RecordEntry} />
      </Switch>
    </Router>
  );
}

export default App;
