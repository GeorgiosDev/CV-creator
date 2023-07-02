import React, { useState, useRef } from "react";
import html2pdf from 'html2pdf.js';

import Info from "./Info";
import Experience from "./Experience";
import Education from "./Education";

const PDFtemplate = () => {
  const [infoValues, setInfoValues] = useState(null);
  const [experienceValues, setExperienceValues] = useState(null);
  const [educationValues, setEducationValues] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  const resultRef = useRef(null);

  const handleSavePDF = () => {
    if (!isFormSubmitted) {
      // Display an error message if form is not submitted
      alert("Please submit the form before saving as PDF.");
      return;
    }
    const resultDiv = resultRef.current;

    // Clear any existing content in the result div
    while (resultDiv.firstChild) {
      resultDiv.removeChild(resultDiv.firstChild);
    }

    // Destructuring the values and create the element with DOM manipulation
    const { firstName, lastName, email, telephone, address, description } = infoValues;
    const infoParagraph = document.createElement("p");
    infoParagraph.classList.add("result-p");
    infoParagraph.innerHTML = `
    <div class = "resume-header">Resume application <br></div>
    <strong class ="resume-name">${firstName} ${lastName}</strong>
    <div class = "personal-info">
        <h2>Personal Information</h2>
        <p class = "personal-paragraph">Full name : ${firstName} ${lastName}</p>
        <p class = "personal-paragraph"><a href="mailto:${email}">${email}</a></p>
        <p class = "personal-paragraph">${telephone}</p>
        <p class = "personal-paragraph">${address}</p>
        <p class = "personal-paragraph">${description}</p>
    </div>
    `;
    resultDiv.appendChild(infoParagraph);

    // Check if user entered experience values and create the elements with DOM manipulation
    if (experienceValues) {
      experienceValues.forEach((experience) => {
        const { position, company, from, to } = experience;
        const experienceParagraph = document.createElement("p");
        experienceParagraph.classList.add("result-p");
        experienceParagraph.innerHTML = `
        <div class = "experience-info">
        <h2>Work Experience</h2>
        <p class = "personal-paragraph">Position: ${position}</p>
        <p class = "personal-paragraph">Company : ${company}</p>
        <p class = "personal-paragraph">From ${from} to ${to}</p>
        </div>
        `
        resultDiv.appendChild(experienceParagraph);
      });
    }
    // Check if user entered education values and create the elements with DOM manipulation
    if (educationValues) {
      educationValues.forEach((education) => {
        const { institution, degree, studyFrom, studyTo } = education;
        const educationParagraph = document.createElement("p");
        educationParagraph.classList.add("result-p");
        educationParagraph.innerHTML = `
        <div class="education-info">
          <h2>Educational Background</h2>
          <p class="personal-paragraph">Institution: <span id="institution-value">${institution}</span></p>
          <p class="personal-paragraph">Degree: <span id="degree-value">${degree}</span></p>
          <p class="personal-paragraph">From - To: <span id="date-value">${studyFrom} - ${studyTo}</span></p>
        </div>
        `;
        resultDiv.appendChild(educationParagraph);
      });
    }
    resultDiv.classList.add("visible");
    const element = resultDiv;
    html2pdf()
      .from(element)
      .save('resume.pdf');

  };

  const handleFormSubmit = (inputValues) => {
    setInfoValues(inputValues);
    setIsFormSubmitted(true);
  };

  const handleExperienceSubmit = (experienceValues) => {
    setExperienceValues(experienceValues);
    setIsFormSubmitted(true);
  };

  const handleEducationSubmit = (educationValues) => {
    setEducationValues(educationValues);
    setIsFormSubmitted(true);
  };

  return (
    <section>
      <div className="pdf-div">
        <Info onSubmit={handleFormSubmit} />
        <Experience onSubmit={handleExperienceSubmit} />
        <Education onSubmit={handleEducationSubmit} />
      </div>
      <button onClick={handleSavePDF} className="btn-resume">
          Save as PDF
        </button>
      <div className="result-div" ref={resultRef}>
      
      </div>
    </section>
  );
};

export default PDFtemplate;
