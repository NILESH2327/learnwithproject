import React from "react";
import Navbar from "./component/Navbar.jsx"
import { ToastContainer } from "react-toastify";
import Home  from "./component/Home.jsx";

const App =()=>{
  return (
    <>
     <Navbar/>
     <Home/>
     <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
   
    
  )
}

export default App;