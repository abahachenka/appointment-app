import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { accountLogout } from '../../actions/account';

class Logout extends React.Component {
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.accountLogout();
        this.props.history.push('/admin');
    }

    render() {
        const {account} = this.props;
        const name = account && (account.name || account.firstName + ' ' + account.lastName);
        const accountUrl = (account && account.name) ? '/clinic-account' : '/doctor-account';

        return this.props.account ? (
            <div className="logout">
                <span className="account-info">You are logged-in as <Link to={accountUrl}>{name}</Link></span>
                <button onClick={this.logout}>Logout</button>
            </div>
        ): null;
    }
}

Logout.propTypes = {
    account: PropTypes.object,
    history: PropTypes.object,
    accountLogout: PropTypes.func
}

const mapStateToProps = ({signIn}) => ({
    account: signIn.account,
    isAuthenticated: signIn.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({
    accountLogout: () => accountLogout()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));