import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Searcher from "./Searcher";
import About from "./About";
import UserDetails from "./UserDetails";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<Searcher />} />
        <Route path="about" element={<About />} />
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);
