import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {requestUserSignIn, resetSignInError} from '../actions/account';

const initialState = {
    userData: {
        email: null,
        password: null
    },
    isFormDisabled: true
}

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            const url = this.props.accountType === 'doctor' ? '/doctor-account' : '/clinic-account';
            
            this.props.history.push(url);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { userData } = this.state;
        this.props.requestSignIn(userData);
    }

    resetForm() {
        this.signinForm.reset();
    }

    checkEmpty() {
        let isFormIncomplete = false;

        for (let prop in this.state.userData) {
            if (!this.state.userData[prop]) {
                isFormIncomplete = true;
                return;
            }
        }

        this.setState(prevState => ({
            userData: {...prevState.userData},
            isFormDisabled: isFormIncomplete
        }));
    }

    onChange(event) {
        const { name, value } = event.target;

        if (this.props.error) {
            this.props.resetError();
        }

        this.setState(prevState => ({
            userData: { ...prevState.userData, [name]: value },
        }));

        this.checkEmpty();
    }

    render() {
        const isSubmitDisabled = this.state.isFormDisabled || this.props.isPending;

        return (
            <main className="page-container">
                <form ref={(el) => this.signinForm = el} className="sign-in-form" onSubmit={this.handleSubmit}>
                    {this.props.error ? (<p className="error">{this.props.error}</p>) : null}
                    <input type="email" name="email" placeholder="email" onChange={this.onChange} />
                    <input type="password" name="password" placeholder="password" onChange={this.onChange} />
                    <input type="submit" value="Sign-In" disabled={isSubmitDisabled} />
                    <p>OR</p>
                    <Link to="/register">Register a new clinic account</Link>
                </form>
            </main>
        )
    }
}

SignIn.propTypes = {
    isPending: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.string,
    requestSignIn: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired,
    accountType: PropTypes.string,
    history: PropTypes.object
}

const mapStateToProps = ({signIn}) => ({
    isPending: signIn.isPending,
    isAuthenticated: signIn.isAuthenticated,
    error: signIn.error,
    accountType: signIn.accountType
});

const mapDispatchToProps = dispatch => bindActionCreators({
    requestSignIn: (userData) => requestUserSignIn(userData),
    resetError: () => resetSignInError()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
