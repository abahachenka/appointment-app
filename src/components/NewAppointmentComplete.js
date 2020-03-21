import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { completeRegistration } from '../actions/appointments';
import moment from 'moment';

class NewAppointmentComplete extends React.Component {
    constructor(props) {
        super();

        this.state = {
            patient: null
        };

        this.drawSelectedAppointment = this.drawSelectedAppointment.bind(this);
        this.completeRegistration = this.completeRegistration.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    drawSelectedAppointment() {
        const date = moment(this.props.selectedAppointment.datetime);
        const month = date.format('MMMM');
        const time = date.format('hh:mm');
        const day = date.format('DD');
        const weekday = date.format('ddd');
        const doctor = this.props.selectedAppointment.doctor;
        const doctorLabel =`${doctor.title}. ${doctor.firstName} ${doctor.lastName}, room: ${doctor.room}`;

        return (
            <div className="patient-selection-info">
                <div className="patient-selection-date">
                    {month} 
                    <span className="day">{day}</span>
                    {weekday}
                </div>
                <div className="patient-selection-time">
                    {time}
                </div>
                <div className="patient-selection-doctor">
                    {doctorLabel}
                </div>
            </div>
        );
    }

    onChange(event) {
        const { name, value } = event.target;

        this.setState(prevState => ({
            patient: { ...prevState.patient, [name]: value },
        }));
    }

    completeRegistration(event) {
        event.preventDefault();

        this.props.completeRegistration(this.state.patient, this.props.selectedAppointment);
    }

    render() {
        const appointment = this.props.selectedAppointment;

        return (
            <main className="page-container">
                {this.props.registrationCode ? (
                    <React.Fragment>
                        <h1 className="page-title">Success!</h1>
                        <p className="appointment-notification">
                            We have sent you an SMS with the details of your appointment.
                        </p>
                        <div className="appointment-receipt">
                            <p className="order-number">Order #<span>{this.props.registrationCode}</span></p>

                            <p className="order-datetime">{moment(appointment.datetime).format('MMMM DD, hh:mm')}</p>
                            <p>Doctor: Therapist, {appointment.doctor.title}. {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                            <p>Room: {appointment.doctor.room}</p>
                            <p>Patient: {this.state.patient.firstName} {this.state.patient.lastName}</p>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="patient-selection">
                            <h1 className="patient-selection-label page-title">Your Selection:</h1>

                            {this.props.selectedAppointment && this.drawSelectedAppointment()}
                        </div>

                        <h2 className="patient-details-form-title page-subtitle">Please, enter your details to finish registration</h2>
                        <p className="error">{this.props.error}</p>
                        <form action="#" className="patient-details-form" onSubmit={this.completeRegistration}>
                            <input type="text" name="firstName" placeholder="First Name" onChange={this.onChange} />
                            <input type="text" name="lastName" placeholder="Last Name" onChange={this.onChange} />
                            <input type="tel" name="contactNumber" placeholder="Contact Number" onChange={this.onChange} />
                            <input type="submit" value="Register" />
                        </form>
                    </React.Fragment>
                )}
                
            </main>
        )
    }
}

const mapStateToProps = ({appointments}) => ({
    selectedAppointment: appointments.selectedAppointment,
    registrationCode: appointments.registrationCode,
    error: appointments.registrationError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    completeRegistration: (patient, appointment) => completeRegistration(patient, appointment)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointmentComplete);