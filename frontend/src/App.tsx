import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import AppBar from "./component/Appbar";
import Todolist from "./component/Todolist";
import TodolistCreate from "./component/Todolistcreate";

export default function App() {
  return (

    <Router>

      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/fuji-mountain-with-milky-way-night_335224-104.jpg?t=st=1724510340~exp=1724513940~hmac=127c4eb30ec91679202a9b0035e15f1a2d518af5eea4af0e0549dfdafc7f4be1&w=1060')",
          backgroundColor: "back",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >

        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolist" element={<Todolist />} />
          <Route path="/todolistcreate" element={<TodolistCreate />} />
        </Routes>

      </div>

    </Router>

  );

}