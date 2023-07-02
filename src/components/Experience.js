import React, { useState } from "react";

const Experience = ({ onSubmit }) => {
  // Set initial state as empty strings 
  // and an empty array to gather my experiences
  const [experiences, setExperiences] = useState([]);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [submitted, setSubmitted] = useState(false);

// Method to validate user inputs
  const validateInput = () => {
    if (position.trim().length === 0 || company.trim().length === 0
    || from.trim().length === 0 || to.trim().length === 0) {
      alert("Please fill in all the fields");
      return false;
    }
    return true;
  };

  // Method to delete experience if the user changes his mind
  const deleteExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  // Method to populate div 
  const populateDiv = () => {
    return experiences.map((exp, index) => (
      <div key={index}>
        <p>{exp.position}</p>
        <p>{exp.company}</p>
        <p>
          From {exp.from} to {exp.to}
        </p>
        <button onClick={() => deleteExperience(index)}>Delete Experience</button>
        <hr />
      </div>
    ));
  };

  // Method to handle submission
  const handleExperience = (event) => {
    event.preventDefault();
    if (!validateInput()) {
      return;
    }
    const experience = { position, company, from, to };
    // Clear the inputs
    setExperiences([...experiences, experience]);
    setPosition("");
    setCompany("");
    setFrom("");
    setTo("");
    setSubmitted(true);
    onSubmit([...experiences, experience]);
  };

  return (
    <section className="experience-sec">
      <form className="experience">
        <h3 className="h3-experience">Work experience</h3>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            placeholder="Enter your position"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="Enter the company name"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="date"
            id="from"
            className="form-control"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="date"
            id="to"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleExperience} className="btn">
          Add Experience
        </button>
      </form>
      {submitted && (
        <div className="experience-div" id="experience-div">
          {populateDiv()}
        </div>
      )}
    </section>
  );
};

export default Experience;
