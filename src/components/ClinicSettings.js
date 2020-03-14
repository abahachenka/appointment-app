import {getAddressList} from '../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ClinicSettings extends React.Component {
    constructor(props) {
        super();

    }

    componentDidMount() {
        this.props.getAddressList();
    }

    render() {
        return (
            <main className="account-page page-container">
                <ul className="breadcrumbs">
                    <li>
                        <a href="#">Clinic #17</a>
                        <span className="separator">></span>
                    </li>
                    <li>Settings</li>
                </ul>

                <h1 className="page-title">Settings</h1>

                <section className="address-cover data-section">
                    <header className="data-section-header">
                        <h2 className="data-section-title">Address Cover</h2>
                        <button className="data-section-btn">Add</button>
                    </header>
                    <p className="error">{this.props.error}</p>

                    {this.props.addressList && this.props.addressList.length && (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Place</th>
                                    <th>Street</th>
                                    <th>Buildings</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.addressList.map((address, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{address.place}</td>
                                        <td>{address.street}</td>
                                        <td>{address.buildings}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        )
    }
}

ClinicSettings.propTypes = {
    addressList: PropTypes.arrayOf(PropTypes.object),
    getAddressList: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

const mapStateToProps = ({clinicSettings}) => ({
    addressList: clinicSettings.addressList,
    error: clinicSettings.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAddressList: () => getAddressList()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSettings);