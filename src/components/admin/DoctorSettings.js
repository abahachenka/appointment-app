import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from './Modal';
import {
    loadAccount, 
    getDoctorAddressList, 
    addNewDoctorAddress
} from '../../actions/account';

const initialState = {
    isModalDisplayed: false,
    isFormDisabled: true,
    newAddress: {
        place: null,
        street: null,
        buildings: null
    }
}

class DoctorSettings extends React.Component {
    constructor() {
        super();

        this.state = {...initialState};

        this.addNewAddress = this.addNewAddress.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openAddNewAddressModal = this.openAddNewAddressModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
    }

    componentDidMount() {
        this.props.getAddressList();

        // load account data
        if (!this.props.account) {
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
        this.setState({...initialState});

        this.resetForm();
    }

    resetForm() {
        this.addNewAddressForm.reset();
    }

    checkEmpty() {
        let isFormDisabled = false;

        for (let prop in this.state.newAddress) {
            if (!this.state.newAddress[prop]) {
                isFormDisabled = true;
                break;
            }
        }

        this.setState(() => ({
            isFormDisabled
        }));
    }

    onChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => ({
            newAddress: { ...prevState.newAddress, [name]: value }
        }), this.checkEmpty);
    }

    render() {
        const {account} = this.props;
        const doctorName = account && `${account.title}. ${account.firstName} ${account.lastName}`;

        return (
            <main className="account-page page-container">
                <ul className="breadcrumbs">
                    <li>
                        <a href="/doctor-account">{doctorName}</a>
                        <span className="separator">&gt;</span>
                    </li>
                    <li>Settings</li>
                </ul>

                <h1 className="page-title">Settings</h1>

                <section className="address-cover data-section">
                    <header className="data-section-header">
                        <h2 className="data-section-title">Address Cover</h2>
                        <button className="data-section-btn button-primary" onClick={this.openAddNewAddressModal}>Add</button>
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
                                        <td>{address.buildings.join(',')}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    )}
                </section>
                {this.state.isModalDisplayed ? (
                    <Modal title="Add New Address" onClose={this.closeModal}>
                        <p>Please add the details of a new area, which is accepted for doctor's service.</p>
                        <form ref={(el) => this.addNewAddressForm = el} onSubmit={this.addNewAddress}>
                            <input type="text" name="place" placeholder="Place" onChange={this.onChange}/>
                            <input type="text" name="street" placeholder="Street" onChange={this.onChange}/>
                            <input type="text" name="buildings" placeholder="Buildings" onChange={this.onChange}/>
                            <p className="input-hint">Please, separate several buildings numbers with a comma</p>
                            <input type="submit" value="Add" disabled={this.state.isFormDisabled}/>
                        </form>
                    </Modal>
                ): null}
            </main>
        )
    }
}

DoctorSettings.propTypes = {
    account: PropTypes.object,
    addressList: PropTypes.arrayOf(PropTypes.object),
    getAddressList: PropTypes.func,
    loadAccount: PropTypes.func,
    addNewAddress: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

const mapStateToProps = ({signIn, doctorSettings}) => ({
    account: signIn.account,
    addressList: doctorSettings.addressList,
    error: doctorSettings.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAddressList: () => getDoctorAddressList(),
    loadAccount: () => loadAccount(),
    addNewAddress: (details) => addNewDoctorAddress(details)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSettings);