import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./storage/store";
import * as serviceWorker from "./serviceWorker";
import Application from "./view/Application";
import Counter from "./view/Counter";
import Detail from "./view/Detail";
import Error404 from "./view/Error404";
import Quizz from "./view/Quizz";
import Test from "./view/Test";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Application} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/quizz" component={Quizz} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/test" component={Test} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
