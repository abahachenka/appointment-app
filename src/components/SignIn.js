import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {requestUserSignIn, resetSignInError} from '../actions/sign-in';

const initialState = {
    userData: {
        email: null,
        password: null
    },
    isFormDisabled: true
}

class SignIn extends React.Component {
    constructor(props) {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
    isCompleted: PropTypes.bool,
    error: PropTypes.string,
    requestSignIn: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired
}

const mapStateToProps = ({signIn}) => ({
    isPending: signIn.isPending,
    isCompleted: signIn.isCompleted,
    error: signIn.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    requestSignIn: (userData) => requestUserSignIn(userData),
    resetError: () => resetSignInError()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
