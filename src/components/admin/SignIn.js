import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import {
    requestUserSignIn, 
    resetSignInError,
    loadAccount
} from '../../actions/account';

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
        this.onBlur = this.onBlur.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.getAccountUrl = this.getAccountUrl.bind(this);
    }

    getAccountUrl() {
       return this.props.accountType === 'doctor' ? '/doctor-account' : '/clinic-account'; 
    }

    componentDidMount() {
        if (!this.props.isAuthenticated && Cookies.get('token')) {
            this.props.loadAccount();
        }

        if (this.props.isAuthenticated) {
            const url = this.getAccountUrl();
            
            this.props.history.push(url);
        }
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            const url = this.getAccountUrl();
            
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
        let isFormDisabled = false;

        for (let prop in this.state.userData) {
            if (!this.state.userData[prop]) {
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
            userData: { ...prevState.userData, [name]: value}
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
                <form ref={(el) => this.signinForm = el} className="sign-in-form" onSubmit={this.handleSubmit}>
                    {this.props.error ? (<p className="error">{this.props.error}</p>) : null}
                    <input type="email" name="email" placeholder="email" onChange={this.onChange} onBlur={this.onBlur}/>
                    <input type="password" name="password" placeholder="password" onChange={this.onChange} onBlur={this.onBlur} />
                    <input type="submit" value="Sign-In" className="button-primary" disabled={isSubmitDisabled} />
                    <p>OR</p>
                    <Link to="/register">Register a new clinic account</Link>
                </form>
            </main>
        )
    }
}

SignIn.propTypes = {
    account: PropTypes.object,
    isPending: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.string,
    requestSignIn: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired,
    accountType: PropTypes.string,
    loadAccount: PropTypes.func,
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
    resetError: () => resetSignInError(),
    loadAccount: () => loadAccount()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
