import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount, loadCategory, sendInvitation, resetInvitationError } from '../actions/account';
import Modal from './Modal';
import DoctorsList from './DoctorsList';

const initialState = {
    isInviteFormDisplayed: false,
    invitation: null
};

class DoctorsCategory extends React.Component {
    constructor(props) {
        super();

        this.state = {...initialState};

        this.openInviteForm = this.openInviteForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.inviteDoctor = this.inviteDoctor.bind(this);
        this.resetInvitationForm = this.resetInvitationForm.bind(this);
    }

    componentDidMount() {
        this.props.loadCategory(this.props.match.params.categoryAlias);

        // load account data
        if (!this.props.clinicName) {
            this.props.loadAccount();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isInvitationSent && this.props.isInvitationSent !== prevProps.isInvitationSent) {
            this.setState(initialState);
            this.resetInvitationForm();
            this.props.resetInvitationError();
        }
    }

    resetInvitationForm() {
        this.invitationForm.reset();
    }

    openInviteForm() {
        this.setState({
            isInviteFormDisplayed: true
        });
    }

    onChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            invitation: { ...prevState.invitation, [name]: value },
        }));
    }

    closeModal() {
        this.setState({
            invitation: null,
            isInviteFormDisplayed: false
        });
    }

    inviteDoctor(event) {
        event.preventDefault();
        this.props.sendInvitation(this.props.activeCategory._id, this.state.invitation);
    }

    render() {
        const categoryName = this.props.activeCategory && this.props.activeCategory.categoryName;

        return (
            <main className="account-page page-container">
                <ul className="breadcrumbs">
                    <li>
                        <a href="/clinic-account">{this.props.clinicName}</a>
                        <span className="separator">></span>
                    </li>
                    <li>
                        <a href="/clinic-account">Doctor Specialisations</a>
                        <span className="separator">></span>
                    </li>
                    <li>{categoryName}</li>
                </ul>

                <section className="doctors data-section">
                    <header className="data-section-header">
                        <h1 className="data-section-title">{categoryName}</h1>
                        <button className="data-section-btn" 
                            onClick={this.openInviteForm}>Invite</button>
                    </header>
                    <p className="error">{this.props.activeCategoryError}</p>
                    <DoctorsList items={this.props.doctors} />
                </section>

                {this.state.isInviteFormDisplayed ? (
                    <Modal title="Invite a Doctor" onClose={this.closeModal}>
                        <form ref={(el) => this.invitationForm = el} onSubmit={this.inviteDoctor}>
                            <p className="error">{this.props.invitationError}</p>
                            <input type="text" name="title" placeholder="Title" onChange={this.onChange} />
                            <input type="text" name="firstName" placeholder="First Name" onChange={this.onChange} />
                            <input type="text" name="lastName" placeholder="Last Name" onChange={this.onChange} />
                            <input type="text" name="room" placeholder="Room" onChange={this.onChange} />
                            <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
                            <input type="submit" value="Send Invitation" />
                        </form>
                    </Modal>
                ): null}
            </main>
        )
    }
}

DoctorsCategory.propTypes = {
    clinicName: PropTypes.string,
    activeCategory: PropTypes.object,
    activeCategoryError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    doctors: PropTypes.arrayOf(PropTypes.object),
    invitationError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isInvitationSent: PropTypes.bool,
    createNewCategory: PropTypes.func,
    loadAccount: PropTypes.func,
    loadCategory: PropTypes.func,
    sendInvitation: PropTypes.func,
    resetInvitationError: PropTypes.func
}

const mapStateToProps = (state) => ({
    clinicName: state.signIn.account && state.signIn.account.name,
    activeCategory: state.doctorCategories.activeCategory,
    activeCategoryError: state.doctorCategories.activeCategoryError,
    doctors: state.doctorCategories.doctors,
    isInvitationSent: state.doctorCategories.isInvitationSent,
    invitationError: state.doctorCategories.invitationError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewCategory: () => {},
    loadAccount: () => loadAccount(),
    loadCategory: (alias) => loadCategory(alias),
    sendInvitation: (categoryId, invitation) => sendInvitation(categoryId, invitation),
    resetInvitationError: () => resetInvitationError()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsCategory);