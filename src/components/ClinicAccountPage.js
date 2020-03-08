import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadAccount} from '../actions/account';

class ClinicAccountPage extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        // if (!this.props.isAuthenticated) {
        //     this.props.history.push('/admin');
        //     return;
        // }

        this.props.loadAccount();
    }

    render() {
        const account = this.props.account;

        return (
            <main className="account-page page-container">
                <h1 className="page-title">{account && account.name}</h1>
                <a href="#" className="account-settings">Settings</a>

                <section className="doctor-specialisations">
                    <h2 className="page-subtitle">Doctor Specialisations</h2>
                    <button>Add New</button>

                    <div className="doctor-specialisations-list">
                        <ul>
                            <li><a href="#">Neurologist</a></li>
                            <li><a href="#">Therapist</a></li>
                            <li><a href="#">Dentist</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Gynecologist</a></li>
                            <li><a href="#">Ophtalmologist</a></li>
                            <li><a href="#">Urologist</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Endocrynologist</a></li>
                            <li><a href="#">Surgeon</a></li>
                        </ul>
                    </div>
                </section>
            </main>
        )
    }
}

ClinicAccountPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    account: PropTypes.object
}

const mapStateToProps = ({signIn}) => ({
    isAuthenticated: signIn.isAuthenticated,
    account: signIn.account
});

const mapDispatchToProps = dispatch => bindActionCreators({
    resetError: () => {},
    loadAccount: () => loadAccount()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicAccountPage);