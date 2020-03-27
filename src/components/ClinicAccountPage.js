import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadAccount} from '../actions/account';
import DoctorCategories from './DoctorCategories';

class ClinicAccountPage extends React.Component {
    componentDidMount() {
        this.props.loadAccount();
    }

    componentDidUpdate() {
        if (!this.props.account) {
            this.props.history.push('/admin');
        }
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
    account: PropTypes.object,
    loadAccount: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    history: PropTypes.object
}

const mapStateToProps = ({signIn}) => ({
    isAuthenticated: signIn.isAuthenticated,
    account: signIn.account,
    error: signIn.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadAccount: () => loadAccount()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicAccountPage);