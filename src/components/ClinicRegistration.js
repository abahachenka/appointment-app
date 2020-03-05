import { connect } from 'react-redux';
import { registerClinic, resetRegistrationError } from '../actions/clinic-registration';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

const initialState = {
    clinic: {
        name: null,
        phoneNumber: null,
        email: null,
        password: null,
        confirmPassword: null
    },
    isRegistrationDisabled: true
}

class ClinicRegistration extends React.Component {
    constructor(props) {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
        let isFormIncomplete = false;

        for (let prop in this.state.clinic) {
            if (!this.state.clinic[prop]) {
                isFormIncomplete = true;
                return;
            }
        }

        this.setState(prevState => ({
            clinic: {...prevState.clinic},
            isRegistrationDisabled: isFormIncomplete
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

    render() {
        const isSubmitDisabled = this.state.isRegistrationDisabled || this.props.isPending;
        
        return (
            <main className="page-container">
                <h1 className="page-title">Register a clinic's account</h1>
                <form ref={(el) => this.registrationForm = el} className="clinic-registration-form" onSubmit={this.handleSubmit} >
                    <p className="error">{this.props.error}</p>
                    <input type="text" name="name" placeholder="Clinic's name" onChange={this.onChange} />
                    <input type="tel" name="phoneNumber" placeholder="Contact number" onChange={this.onChange} />
                    <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.onChange} />
                    <input type="submit" value="Register" disabled={isSubmitDisabled}/>
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