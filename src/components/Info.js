import React from "react";


class Info extends React.Component{
    // Set up initial state
    constructor(props) {
        super(props)
        // Set initial state as empty strings.Also two empty arrays to handle inputs and submission later
        this.state = {firstName : "",lastName : "", email : "",telephone : "", address : "", description : "", information: [],submitted: false,infoElements : []}
    }

    // Handle user Input 
    handleInput = (event, id) => {
        event.preventDefault();
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Validation method so that user does not enter empty values
    validateInputs = () => {
        // Set initial state as user input values
        const {firstName,lastName,email,telephone,address,description} = this.state;
        // Check if user entered valid input and display warning message
        if (firstName.trim() === "" ||lastName.trim() === "" || email.trim() === "" 
        ||telephone.trim() === "" ||address.trim() === "" ||description.trim() === ""
        ) {
        alert("Please fill in all the fields.");
        return false;
        }
        return true;
    };

    // Handle submit method
    handleSubmit = (event) => {
        event.preventDefault();
        // Check if user submitted 
        if (this.state.submitted) {
            return;
        }
        // Check if inputs are valid
        if (!this.validateInputs()) {
            return;
        }
        // Set initial state
        const {firstName,lastName,email,telephone,address,description,information} = this.state;
        // Create a new object that will handle user inputs
        const newInfo = {firstName,lastName,email,telephone,address,description};
        // Create a new array that is populated with information posted
        const updatedInformation = [...information, newInfo];
        this.setState(
        {
            firstName: "",lastName: "",email: "",telephone: "",address: "",description: "",information: updatedInformation,submitted: true,
        },() => {
            this.populateInfoDiv();
            this.props.onSubmit(newInfo)
        }
        );
    };
    // Method to populate my info div after submission
    populateInfoDiv = () => {
        const { information } = this.state;
        const infoElements = information.map((info, index) => (
            <div key={index}>
                <p>First Name: {info.firstName}</p>
                <p>Last Name: {info.lastName}</p>
                <p>Email: {info.email}</p>
                <p>Telephone: {info.telephone}</p>
                <p>Address: {info.address}</p>
                <p>Description: {info.description}</p>
                <hr />
            </div>
        ));
    
        this.setState({
        infoElements
        });
    };

render(){
    const {infoElements,submitted} = this.state
        return(
            <section className="info-sec">
                <form className="info" onSubmit={this.handleSubmit}>
                <h3 className="info-h3">Personal Information</h3>
                <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    className="form-control"
                    onChange={(event) => this.handleInput(event, 'firstName')}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    className="form-control"
                    onChange={(event) => this.handleInput(event, 'lastName')}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="form-control"
                    onChange={(event) => this.handleInput(event, 'email')}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="telephone">Telephone</label>
                <input
                    type="tel"
                    id="telephone"
                    placeholder="Enter your telephone number"
                    className="form-control"
                    onChange={(event) => this.handleInput(event, 'telephone')}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    className="form-control"
                    onChange={(event) => this.handleInput(event, 'address')}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                placeholder="Describe yourself in a few words"
                className="form-control"
                rows={8}
                onChange={(event) => this.handleInput(event, 'description')} 
                ></textarea>
                </div>
                <button type="submit" className="btn">Submit</button>
                </form>
                {submitted && (
                    <div className="info-div" id = "info-div">
                        {infoElements}
                    </div>
                )}
            </section>
        );
    }
}


export default Info