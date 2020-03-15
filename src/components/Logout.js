import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props);

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

export default withRouter(Logout);