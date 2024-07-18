import React, { useState } from "react";
import Content from "./content";
import Header from "./navbar";
import "./App.css";

const App = () => {

  return (
    <div className="App">
      <Header />
      <div id="home">
        <Content />
      </div>
      <footer>
        <p>© By Aditya Sharma | Aman Senger | Divya Gautam</p>
      </footer>
    </div>
  );
};

export default App;
