import {loadAccount, getAddressList, addNewAddress} from '../actions/account';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';

class ClinicSettings extends React.Component {
    constructor(props) {
        super();

        this.state = {
            isModalDisplayed: false,
            newAddress: null
        };

        this.addNewAddress = this.addNewAddress.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openAddNewAddressModal = this.openAddNewAddressModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        this.props.getAddressList();

        // load account data
        if (!this.props.clinicName) {
            this.props.loadAccount();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.isModalDisplayed && this.props.addressList.length !== prevProps.addressList.length) {
            this.closeModal();
        }
    }

    openAddNewAddressModal() {
        this.setState({isModalDisplayed: true});
    }

    addNewAddress(event) {
        event.preventDefault();
        this.props.addNewAddress(this.state.newAddress);
    }

    closeModal() {
        this.setState({
            newAddress: null,
            isModalDisplayed: false
        });

        this.resetForm();
    }

    resetForm() {
        this.addNewAddressForm.reset();
    }

    onChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => ({
            newAddress: { ...prevState.newAddress, [name]: value }
        }));
    }

    render() {
        return (
            <main className="account-page page-container">
                <ul className="breadcrumbs">
                    <li>
                        <a href="/clinic-account">{this.props.clinicName}</a>
                        <span className="separator">></span>
                    </li>
                    <li>Settings</li>
                </ul>

                <h1 className="page-title">Settings</h1>

                <section className="address-cover data-section">
                    <header className="data-section-header">
                        <h2 className="data-section-title">Address Cover</h2>
                        <button className="data-section-btn" onClick={this.openAddNewAddressModal}>Add</button>
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
                {this.state.isModalDisplayed ? (
                    <Modal title="Add New Address" onClose={this.closeModal}>
                        <p>Please add the details of a new clinic service address. Several buildings can be separated with a comma.</p>
                        <form ref={(el) => this.addNewAddressForm = el} onSubmit={this.addNewAddress}>
                            <input type="text" name="place" placeholder="Place" onChange={this.onChange}/>
                            <input type="text" name="street" placeholder="Street" onChange={this.onChange}/>
                            <input type="text" name="buildings" placeholder="Buildings" onChange={this.onChange}/>
                            <input type="submit" value="Add"/>
                        </form>
                    </Modal>
                ): null}
            </main>
        )
    }
}

ClinicSettings.propTypes = {
    clinicName: PropTypes.string,
    addressList: PropTypes.arrayOf(PropTypes.object),
    getAddressList: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

const mapStateToProps = ({signIn, clinicSettings}) => ({
    clinicName: signIn.account && signIn.account.name,
    addressList: clinicSettings.addressList,
    error: clinicSettings.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAddressList: () => getAddressList(),
    loadAccount: () => loadAccount(),
    addNewAddress: (details) => addNewAddress(details)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicSettings);