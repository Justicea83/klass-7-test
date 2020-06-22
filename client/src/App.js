import React from 'react';
import './App.css';
import Home from "./containers/Home/Home";
import {Route,Switch} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Urls from "./containers/Urls/Url";
import Url from "./containers/Urls/Url/Url";
import ShowUrlDetail from "./containers/Urls/ShowUrlDetail/ShowUrlDetail";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Switch>
            <Route component={Home} path="/" exact/>
            <Route component={Urls} path="/urls" exact/>
            <Route component={ShowUrlDetail} path="/urls/:id"/>
            <Route component={Url} path="/:id"/>
        </Switch>

    </div>
  );
}

export default App;
