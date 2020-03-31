import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    registerClinic, 
    resetRegistrationError 
} from '../../actions/clinic-registration';
import { bindActionCreators } from 'redux';

const initialState = {
    clinic: {
        name: null,
        phoneNumber: null,
        email: null,
        password: null,
        confirmPassword: null
    },
    isFormDisabled: true
}

class ClinicRegistration extends React.Component {
    constructor() {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isCompleted && this.props.isCompleted !== prevProps.isCompleted) {
            alert('Registration is successfully completed. You can sign-in into your account.');
            this.setState(initialState);
            this.resetForm();
            this.props.resetError();
        }
    }

    resetForm() {
        this.registrationForm.reset();
    }

    handleSubmit(event) {
        event.preventDefault();
        const { clinic } = this.state;
        this.props.registerClinic(clinic);
    }

    checkEmpty() {
        let isFormDisabled = false;

        for (let prop in this.state.clinic) {
            if (!this.state.clinic[prop]) {
                isFormDisabled = true;
                break;
            }
        }

        this.setState(() => ({
            isFormDisabled
        }));
    }

    onChange(event) {
        const { name, value } = event.target;

        if (this.props.error) {
            this.props.resetError();
        }

        this.setState(prevState => ({
            clinic: { ...prevState.clinic, [name]: value },
        }));

        this.checkEmpty();
    }

    onBlur() {
        this.checkEmpty();
    }

    render() {
        const isSubmitDisabled = this.state.isFormDisabled || this.props.isPending;
        
        return (
            <main className="page-container">
                <h1 className="page-title">Register a clinic&lsquo;s account</h1>
                <form ref={(el) => this.registrationForm = el} className="clinic-registration-form" onSubmit={this.handleSubmit} >
                    <p className="error">{this.props.error}</p>
                    <input type="text" name="name" placeholder="Clinic's name" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="tel" name="phoneNumber" placeholder="Contact number" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="text" name="address" placeholder="Address" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="email" name="email" placeholder="Email" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="password" name="password" placeholder="Password" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="submit" value="Register" className="button-primary" disabled={isSubmitDisabled}/>
                </form>
            </main>
        )
    }
}

ClinicRegistration.propTypes = {
    isPending: PropTypes.bool,
    isCompleted: PropTypes.bool,
    error: PropTypes.string,
    registerClinic: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired
}

const mapStateToProps = ({clinicRegistration}) => ({
    isPending: clinicRegistration.isPending,
    isCompleted: clinicRegistration.isCompleted,
    error: clinicRegistration.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    registerClinic: clinic => registerClinic(clinic),
    resetError: () => resetRegistrationError()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicRegistration);
