import React from "react";
import "../styles/app.css";
import Navbar from "./Navbar";
import PDFtemplate from "./PDFtemplate";

class Main extends React.Component {
  render() {
    return (
      <section className="main">
            <Navbar/>     
            <PDFtemplate/>
      </section>
    );
  }
}

export default Main;
