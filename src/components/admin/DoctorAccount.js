import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import {
    loadAccount, 
    createNewAppointment
} from '../../actions/account';

const initialState = {
    isModalDisplayed: false,
    appointment: {
        date: null,
        time: '09:00'
    }
}

class DoctorAccount extends React.Component { 
    constructor() {
        super();

        this.state = {...initialState};

        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addNewAppointment = this.addNewAppointment.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.props.loadAccount();
    }

    componentDidUpdate(prevProps) {
        if (this.props.appointments && this.props.appointments.length > prevProps.appointments.length) {
            this.closeModal();
        }
    }

    closeModal() {
        this.setState({...initialState});
    }

    onChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            appointment: { ...prevState.appointment, [name]: value },
        }));
    }

    openModal() {
        this.setState({isModalDisplayed: true});
    }

    addNewAppointment(event) {
        event.preventDefault();

        this.props.createNewAppointment(this.state.appointment);
    }

    render() {
        const {account, appointments} = this.props;

        return (
            <main className="doctor-account-page account-page page-container">
                <p>{this.props.error}</p>
                {account ? (
                    <React.Fragment>
                        <h1 className="page-title">{account.title}. {account.firstName} {account.lastName}</h1>
                        <Link to="/doctor-account/settings" className="account-settings">Settings</Link>
                        <div className="doctor-details">
                            <p>Specialisation: {account.categoryName}</p>
                            <p>Room: {account.room}</p>
                        </div>
                    </React.Fragment>
                ): null}

                <section className="data-section">
                    <header className="data-section-header">
                        <h2 className="data-section-title">Appointments</h2>
                        <button className="data-section-btn" onClick={this.openModal}>Add New</button>
                    </header>

                    {appointments && appointments.length && (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Patient</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment, index) => {
                                    const datetime = moment(appointment.datetime);
                                    const date = datetime.format('DD/MMM/YYYY');
                                    const time = datetime.format('HH:mm');
                                    
                                    return (
                                        <tr key={index}>
                                            <td>{date}</td>
                                            <td>{time}</td>
                                            <td>{appointment.patient}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </section>

                {this.state.isModalDisplayed ? (
                    <Modal title="Add New Appointment" onClose={this.closeModal}>
                        <form ref={(el) => this.appointmentForm = el} onSubmit={this.addNewAppointment}>
                            <input type="date" name="date" onChange={this.onChange}/>
                            <select name="time" onChange={this.onChange}>
                                <option val="09:00" defaultValue>09:00</option>
                                <option val="09:30">09:30</option>
                                <option val="10:00">10:00</option>
                                <option val="10:30">10:30</option>
                                <option val="11:00">11:00</option>
                                <option val="11:30">11:30</option>
                                <option val="12:00">12:00</option>
                                <option val="12:30">12:30</option>
                                <option val="13:00">13:00</option>
                                <option val="13:30">13:30</option>
                                <option val="14:00">14:00</option>
                                <option val="14:30">14:30</option>
                                <option val="15:00">15:00</option>
                                <option val="15:30">15:30</option>
                                <option val="16:00">16:00</option>
                                <option val="16:30">16:30</option>
                                <option val="17:00">17:00</option>
                                <option val="17:30">17:30</option>
                            </select>
                            <input type="submit" value="OK"/>
                        </form>
                    </Modal>
                ): null}
            </main>
        )
    }
}

DoctorAccount.propTypes = {
    account: PropTypes.object,
    appointments: PropTypes.arrayOf(PropTypes.object),
    createNewAppointment: PropTypes.func,
    error: PropTypes.string,
    loadAccount: PropTypes.func
}

const mapStateToProps = ({signIn, doctorAppointments}) => ({
    account: signIn.account,
    error: signIn.error,
    appointments: doctorAppointments.items
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadAccount: () => loadAccount(),
    createNewAppointment: (appointment) => createNewAppointment(appointment)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAccount);