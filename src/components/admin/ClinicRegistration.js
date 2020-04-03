import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { Link } from 'react-router-dom';
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
    isFormDisabled: true,
    isModalDisplayed: false
}

class ClinicRegistration extends React.Component {
    constructor() {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isCompleted && this.props.isCompleted !== prevProps.isCompleted) {
            this.showModal();
        }
    }

    showModal() {
        this.setState({isModalDisplayed: true});
    }

    resetForm() {
        this.setState(initialState);
        this.registrationForm.reset();
        this.props.resetError();
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
        }), this.checkEmpty());
    }

    createMarkup(str) {
        return {__html: str};
    }

    closeModal() {
        this.resetForm();
    }

    render() {
        return (
            <React.Fragment>
                <main className="page-container">
                    <h1 className="page-title">Register a clinic&lsquo;s account</h1>
                    <form ref={(el) => this.registrationForm = el} className="clinic-registration-form" onSubmit={this.handleSubmit} >
                        <p className="error" dangerouslySetInnerHTML={this.createMarkup(this.props.error)} />
                        <input type="text" name="name" placeholder="Clinic's name" onChange={this.onChange} />
                        <input type="tel" name="phoneNumber" placeholder="Contact number" onChange={this.onChange} />
                        <input type="text" name="address" placeholder="Address" onChange={this.onChange} />
                        <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
                        <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.onChange} />
                        <input type="submit" value="Register" className="button-primary" disabled={this.state.isFormDisabled}/>
                    </form>
                </main>

                {this.state.isModalDisplayed ? (
                    <Modal title="Successful Registration" onClose={this.closeModal}>
                        <div className="modal-success-message">
                            <p>Registration is successfully completed!<br /> 
                            You can <Link to="/admin">sign in</Link> to your account.</p>
                        </div>
                    </Modal>
                ) : null}
            </React.Fragment>
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
