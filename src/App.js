// import logo from './logo.svg';
// import './App.css';
// import LoginSignup from './components/LoginSignup/LoginSignup';

// function App() {
//   return (
//     <div >
//       <LoginSignup/>
//     </div>
//   );
// }

// export default App;
import React from "react";
import "./App.css"; // Add styles here

const App = () => {
  return (
    <div className="container">
      {/* Left Section */}
      <div className="section left">
        <h2>For Learner</h2>
        {/* <p>
          We are the market-leading technical interview platform to identify and
          hire developers with the right skills.
        </p> */}
        <button className="login-btn">Login</button>
        <p className="extra-info">
          Don't have an account? <a href="#">Sign Up</a> 
          {/* <a href="#">Get free trial.</a> */}
        </p>
      </div>

      {/* Right Section */}
      <div className="section right">
        <h2>For Educator</h2>
        {/* <p>
          Join over 21 million developers, practice coding skills, prepare for
          interviews, and get hired.
        </p> */}
        <button className="login-btn">Login</button>
        <p className="extra-info">
          Don't have an account? <a href="#">Sign up.</a>
        </p>
      </div>
    </div>
  );
};

export default App;

