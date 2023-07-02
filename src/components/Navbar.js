import React from "react";
import "../styles/app.css";

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <h2 className="h2-nav" >CV creator form</h2>
        <p className="p-nav">Fill in and submit all the forms and then save your resume as a PDF</p>
      </div>
    );
  }
}

export default Navbar;
