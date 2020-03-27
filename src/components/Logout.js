import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    logout() {
        Cookies.remove('token');
        this.props.history.push('/admin');
    }

    render() {
        const token = Cookies.get('token');

        return token ? (
            <button onClick={this.logout}>Logout</button>
        ): null;
    }
}

Logout.propTypes = {
    history: PropTypes.object
}

export default withRouter(Logout);