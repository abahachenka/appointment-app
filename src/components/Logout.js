import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { accountLogout } from '../actions/account';

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
        return this.props.account ? (
            <div className="logout">
                <button onClick={this.logout}>Logout</button>
            </div>
        ): null;
    }
}

Logout.propTypes = {
    account: PropTypes.object,
    history: PropTypes.object
}

const mapStateToProps = ({signIn}) => ({
    account: signIn.account
});

const mapDispatchToProps = dispatch => bindActionCreators({
    accountLogout: () => accountLogout()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));