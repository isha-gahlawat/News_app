import React from "react";
import Topp from "./Components/Topp";
import Navbar from "./Components/Navbar";
import  { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Context } from "./Context/Context";

const App = () => {
    const { progress,setprogress } = useContext(Context);
  return (
    <>
      <Router>
      <LoadingBar
        color="#f11946"
        progress={progress}
        
      />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Topp  setprogress={setprogress} category="general" key="general"/>} />
          <Route exact path="/business" element={<Topp  setprogress={setprogress} category="business" key="business"/>} />
          <Route exact path="/entertainment" element={<Topp setprogress={setprogress} category="entertainment" key="entertainment"/>} />
          <Route exact path="/general" element={<Topp  setprogress={setprogress} category="general" key="general" />} />
          <Route exact path="/health" element={<Topp setprogress={setprogress}  category="health" key="health"/>} />
          <Route exact path="/science" element={<Topp  setprogress={setprogress} category="science" key="science" />} />
          <Route exact path="/sports" element={<Topp setprogress={setprogress}  category="sports" key="sports"/>} />
          <Route exact path="/technology" element={<Topp  setprogress={setprogress}  category="technology" key="technology"/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
