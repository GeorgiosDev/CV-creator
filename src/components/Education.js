import React, { useState } from 'react';

const Education = ({onSubmit}) => {
// Set initial state as empty strings
//and an empty array to gather my education inputs
const [educations, setEducations] = useState([]);
const [institution, setInstitution] = useState('');
const [degree, setDegree] = useState('');
const [studyFrom, setStudyFrom] = useState('');
const [studyTo, setStudyTo] = useState('');
const [submitted, setSubmitted] = useState(false);

//Method to validate  user inputs
const validateEdInput = () => {
    if(institution.trim().length === 0 || degree.trim().length === 0 
    || studyFrom.trim().length === 0 || studyTo.trim().length === 0) {
        alert("All Fields Are Required");
        return false;
    } else{
        return true;    
    }
}

// Method to delete education if the user changes his mind
const deleteEducation = (index) => {
    const updatedEducation = [...educations]
    updatedEducation.splice(index,1)
    setEducations(updatedEducation)
}

// Method to populate div 
const populateEdDiv = () => {
    return educations.map((edu,index) => (
        <div key={index}>
            <p>{`Institute: ${edu.institution}`}</p>
            <p>{`Degree : ${edu.degree}`}</p>
            <p>{`Study from ${edu.studyFrom}  to ${edu.studyTo}`}</p>
            <button onClick={() => deleteEducation(index)}>Delete Education</button>
        </div>
    ))
}

// Method to handle submission
const handleEducation = (event) => {
    event.preventDefault();
    if(!validateEdInput()){
        return;
    }
    const education = {institution,degree,studyFrom,studyTo}
    setEducations([...educations, education]);
    // Clear the inputs
    setInstitution('');
    setDegree('');
    setStudyFrom('');
    setStudyTo('');
    setSubmitted(true);
    onSubmit([...educations, education]);

};

return (
    <section className="education-sec">
    <form className='education'>
        <h3 className="education-h3">Education</h3>
        <div className="form-group">
        <label htmlFor="institution">Institution</label>
        <input
            type="text"
            id="institution"
            placeholder="Enter the institution name"
            className="form-control"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="degree">Degree</label>
        <input
            type="text"
            id="degree"
            placeholder="Enter your degree"
            className="form-control"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="studyFrom">From</label>
        <input
            type="date"
            id="studyFrom"
            className="form-control"
            value={studyFrom}
            onChange={(e) => setStudyFrom(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="studyTo">To</label>
        <input
            type="date"
            id="studyTo"
            className="form-control"
            value={studyTo}
            onChange={(e) => setStudyTo(e.target.value)}
        />
        </div>
        <button type="submit" onClick={handleEducation} className="btn">
            Add Education
        </button>
    </form>
    {submitted && (
        <div className="education-div" id='education-div'>
            {populateEdDiv()}
        </div>
    )}
    </section>
);
};

export default Education;
