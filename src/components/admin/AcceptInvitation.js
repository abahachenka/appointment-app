import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { activateAccount, checkInvitationToken} from '../../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const initialState = {
    account: {
        password: null,
        confirmPassword: null
    },
    isSuccessMessageDisplayed: false,
    isFormDisabled: true
};

class AcceptInvitation extends React.Component {
    constructor() {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        //check token
        this.props.checkInvitationToken(token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isInvitationAccepted && this.props.isInvitationAccepted !== prevProps.isInvitationAccepted) {
            this.setState({
                isSuccessMessageDisplayed: true
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const token = this.props.match.params.token;
        const {password, confirmPassword} = this.state.account;
        
        this.props.activateAccount(token, password, confirmPassword);
    }

    checkEmpty() {
        let isFormDisabled = false;

        for (let prop in this.state.account) {
            if (!this.state.account[prop]) {
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

        this.setState(prevState => ({
            account: { ...prevState.account, [name]: value }
        }), this.checkEmpty);
    }

    createMarkup(str) {
        return {__html: str};
    }

    render() {
        return (
            <React.Fragment>
                <main className="home-page page-container"></main>

                <Modal title="Accept Invitation">
                    {!this.state.isSuccessMessageDisplayed && this.props.isTokenValid && (
                        <React.Fragment>
                            <p>You have been invited to create a doctors account.
                                Please, finish your registration.
                            </p>
                            <p className="error" dangerouslySetInnerHTML={this.createMarkup(this.props.acceptInvitationError)} />
                            <form ref={(el) => this.acceptInvitationForm = el} onSubmit={this.handleSubmit}>
                                <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.onChange} />

                                <input type="submit" value="Register" disabled={this.state.isFormDisabled}/>
                            </form>
                        </React.Fragment>
                    )}
                    {this.state.isSuccessMessageDisplayed && (
                        <div className="modal-message">
                            <p>
                                Your account has been successfully activated. <br/>
                                Now you may sign-in.
                            </p>
                            <p>
                                <Link to="/admin" className="button-primary">OK</Link>
                            </p>
                        </div>
                    )}

                    {this.props.isTokenValid ===false && (
                        <div className="modal-message">
                            <p>
                                The link is invalid!
                            </p>
                            <p>
                                <Link to="/" className="button-primary">Close</Link>
                            </p>
                        </div>
                    )}
                    
                </Modal>
            </React.Fragment>
        )
    }
}

AcceptInvitation.propTypes = {
    activateAccount: PropTypes.func,
    isInvitationAccepted: PropTypes.bool,
    acceptInvitationError: PropTypes.string,
    match: PropTypes.object,
    checkInvitationToken: PropTypes.func,
    isTokenValid: PropTypes.bool,
    error: PropTypes.string
}

const mapStateToProps = ({doctorCategories}) => ({
    isTokenValid: doctorCategories.isInvitationTokenValid,
    isInvitationAccepted: doctorCategories.isInvitationAccepted,
    acceptInvitationError: doctorCategories.acceptInvitationError,
    error: doctorCategories.invitationTokenError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    activateAccount: (token, password, confirmPassword) => activateAccount(token, password, confirmPassword),
    checkInvitationToken: (token) => checkInvitationToken(token)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvitation);

