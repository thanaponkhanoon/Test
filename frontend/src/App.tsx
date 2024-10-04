import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import ButtonAppBar from "./component/Appbar";
import Todolist from "./component/Todolist";


export default function App() {
  return (

    <Router>

      <div>

        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolist"  element={<Todolist />} />
        </Routes>

      </div>

    </Router>

  );

}