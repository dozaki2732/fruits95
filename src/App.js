import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import HomePage from "./components//pages/HomePage";
import RecordEntry from "./components/pages/RecordEntry";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home-page" component={HomePage} />
        <Route exact path="/record-entry" component={RecordEntry} />
      </Switch>
    </Router>
  );
}

export default App;
