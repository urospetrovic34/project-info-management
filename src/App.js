import React from "react";
import Header from "./components/elements/Header";
import Input from "./components/elements/Input";
import { FaReact } from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="input-container">
        <FaReact className="react-icon" />
        <Input placeholder="Search projects" />
      </div>
    </div>
  );
}

export default App;
