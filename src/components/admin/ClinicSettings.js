import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import {
    loadAccount, 
    getAddressList, 
    addNewAddress
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

class ClinicSettings extends React.Component {
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
        return (
            <React.Fragment>
                <main className="account-page page-container">
                    <ul className="breadcrumbs">
                        <li>
                            <a href="/clinic-account">{this.props.clinicName}</a>
                            <span className="separator">&gt;</span>
                        </li>
                        <li>Settings</li>
                    </ul>

                    <h1 className="page-title">Settings</h1>

                    <section className="address-cover data-section">
                        <header className="data-section-header">
                            <h2 className="data-section-title">Service Area Coverage</h2>
                            <button className="data-section-btn button-primary" onClick={this.openAddNewAddressModal}>Add</button>
                        </header>
                        <p className="error">{this.props.error}</p>

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
                            {!this.props.addressList.length ? (
                            <tr>
                                <td colSpan="3">There are no entries yet</td>
                            </tr>
                            ) : null}
                            </tbody>
                        </table>
                    </section>
                </main>
                {this.state.isModalDisplayed ? (
                    <Modal title="Add New Address" onClose={this.closeModal}>
                        <p>Please add the details of a new area, which is accepted for clinic's service.</p>
                        <form ref={(el) => this.addNewAddressForm = el} onSubmit={this.addNewAddress}>
                            <input type="text" name="place" placeholder="Place" onChange={this.onChange} />
                            <input type="text" name="street" placeholder="Street" onChange={this.onChange} />
                            <input type="text" name="buildings" placeholder="Buildings" onChange={this.onChange} />
                            <p className="input-hint">Please, separate several buildings numbers with a comma</p>
                            <input type="submit" value="Add" className="button-primary" disabled={this.state.isFormDisabled}/>
                        </form>
                    </Modal>
                ): null}
            </React.Fragment>
        )
    }
}

ClinicSettings.propTypes = {
    clinicName: PropTypes.string,
    addressList: PropTypes.arrayOf(PropTypes.object),
    getAddressList: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    loadAccount: PropTypes.func,
    addNewAddress: PropTypes.func
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