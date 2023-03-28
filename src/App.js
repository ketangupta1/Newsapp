import "./App.css";

import React from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default function App() {
  const { width, height } = useWindowSize()
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
      <Route path='/news' element = {<News/>}/>
        <Route path='/confetti' element = {<Confetti width={width} height={height}/>}/>
      </Routes>
      </Router>
    </>
    
  );
}
