import {loadAccount} from '../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class DoctorAccount extends React.Component { 
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.loadAccount();
    }

    render() {
        const {account} = this.props;

        return (
            <main className="doctor-account-page account-page page-container">
                <p>{this.props.error}</p>
                {account ? (
                    <React.Fragment>
                        <h1 className="page-title">{account.title}. {account.firstName} {account.lastName}</h1>
                        <div className="doctor-details">
                            <p>Specialisation: {account.categoryName}</p>
                            <p>Room: {account.room}</p>
                        </div>
                    </React.Fragment>
                ): null}

                <section className="data-section">
                    <header className="data-section-header">
                        <h2 className="data-section-title">Appointments</h2>
                        <button className="data-section-btn">Add New</button>
                    </header>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Patient</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Feb 3</td>
                                <td>12:00</td>
                                <td>Alexandr Smirnov</td>
                            </tr>
                            <tr>
                                <td>Feb 4</td>
                                <td>15:00</td>
                                <td>Anna Kuzmina</td>
                            </tr>
                            <tr>
                                <td>Feb 13</td>
                                <td>09:00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feb 13</td>
                                <td>09:20</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feb 13</td>
                                <td>09:40</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feb 13</td>
                                <td>10:00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feb 13</td>
                                <td>10:20</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        )
    }
}

DoctorAccount.propTypes = {
    account: PropTypes.object,
    error: PropTypes.string,
    loadAccount: PropTypes.func
}

const mapStateToProps = ({signIn}) => ({
    account: signIn.account,
    error: signIn.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadAccount: () => loadAccount()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAccount);