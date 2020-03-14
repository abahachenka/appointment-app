import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadAccount} from '../actions/account';
import DoctorCategories from './DoctorCategories';

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
                <Link to="/clinic-account/settings" className="account-settings">Settings</Link>
                <DoctorCategories />
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