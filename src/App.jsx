import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Message from "./components/wrapper/Message";
import Main from "./page/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/:insta_id/:questionId" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
