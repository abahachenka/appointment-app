import PropTypes from 'prop-types';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { activateAccount, checkInvitationToken} from '../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const initialState = {
    account: null,
    isSuccessMessageDisplayed: false
};

class AcceptInvitation extends React.Component {
    constructor(props) {
        super();

        this.state = {...initialState};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
        
        if (token && password === confirmPassword) {
            this.props.activateAccount(token, password);
        } else {
            alert('Something went wrong');
        }
    }

    onChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            account: { ...prevState.account, [name]: value }
        }));
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
                            <p className="error">{this.props.acceptInvitationError}</p>
                            <form ref={(el) => this.acceptInvitationForm = el} onSubmit={this.handleSubmit}>
                                <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.onChange} />

                                <input type="submit" value="Register" />
                            </form>
                        </React.Fragment>
                    )}
                    {this.state.isSuccessMessageDisplayed && (
                        <div className="modal-success-message">
                            <p>
                                Your account has been successfully activated. <br/>
                                Now you may sign-in.
                            </p>
                            <p>
                                <Link to="/admin" className="button">OK</Link>
                            </p>
                        </div>
                    )}

                    {this.props.isTokenValid ===false && (
                        <div>
                            <p>
                                The link is invalid!
                            </p>
                            <p>
                                <Link to="/" className="button">Close</Link>
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
    acceptInvitationError: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

const mapStateToProps = ({doctorCategories}) => ({
    isTokenValid: doctorCategories.isInvitationTokenValid,
    isInvitationAccepted: doctorCategories.isInvitationAccepted,
    acceptInvitationError: doctorCategories.acceptInvitationError,
    error: doctorCategories.invitationTokenError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    activateAccount: (token, password) => activateAccount(token, password),
    checkInvitationToken: (token) => checkInvitationToken(token)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AcceptInvitation);

