import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Message from "./components/wrapper/Message";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:insta_id/:questionId" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
