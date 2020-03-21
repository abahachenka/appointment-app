import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loadAppointments} from '../actions/appointments';
import moment from 'moment';

class AvailableAppointments extends React.Component {
    constructor(props) {
        super();

        this.formatAppointments = this.formatAppointments.bind(this);
        this.drawCalendar = this.drawCalendar.bind(this);
        this.getDays = this.getDays.bind(this);
        this.drawAppointment = this.drawAppointment.bind(this);
        this.drawAppointmentsList = this.drawAppointmentsList.bind(this);
    }

    componentDidMount() {
        this.props.loadAppointments();
    }

    formatAppointments(src) {
        this.appointmentsTree = {};

        src.map((appointment, index) => {
            const date = moment(appointment.datetime);
            const year = date.year();
            const month = date.format('MMMM');
            const day = date.format('DD');
            const weekday = date.format('ddd');

            if (typeof this.appointmentsTree[year] === 'undefined') {
                this.appointmentsTree[year] = {};
            }

            if (typeof this.appointmentsTree[year][month] === 'undefined') {
                this.appointmentsTree[year][month] = {};
            }

            if (typeof this.appointmentsTree[year][month][day] === 'undefined'){
                this.appointmentsTree[year][month][day] = {
                    weekday,
                    appointments: []
                };
            }

            this.appointmentsTree[year][month][day].appointments.push(appointment);
        });
    }

    drawAppointment(appointment, index) {
        const time = moment(appointment.datetime).format('hh:mm');
        const doctor = appointment.doctor;
        const doctorName = doctor.title + '. ' + doctor.firstName + ' ' + doctor.lastName;

        return (
            <li key={index}>
                <div className="time">{time}</div>
                <p className="doctor-info">{doctorName}, room: {doctor.room}</p>
            </li>
        );
    }

    drawAppointmentsList(appointments) {
        const html = [];

        appointments.forEach((appointment, ind) => {
            html.push(this.drawAppointment(appointment, ind));
        });
        
        return html;
    }

    getDays(year, month) {
        const days = Object.keys(this.appointmentsTree[year][month]);
        const html = [];

        days.forEach((day, index) => {
            const currentDay = this.appointmentsTree[year][month][day];
            

            html.push(
                <li key={index}>
                    <div className="appointment-day">
                        <span className="date">{day}</span>
                        {currentDay.weekday}
                    </div>

                    <ul className="appointment-options">
                        {this.drawAppointmentsList(currentDay.appointments)}
                    </ul>
                </li>
            );
        });

        return html;
    }
 
    drawCalendar() {
        const years = Object.keys(this.appointmentsTree);
        const calendarMonthsLabels = [];
        const html = [];

        years.forEach((year, index) => {
            const months = Object.keys(this.appointmentsTree[year]);

            months.forEach((month, index) => {
                html.push(
                    <div key={index}>
                        <h2 className="page-subtitle">{month + ', ' + year}</h2>

                        <ul className="available-appointments">
                            {this.getDays(year, month)}
                        </ul>
                    </div>
                );
            });
        });

        return html;
    }

    render() {
        const appointments = this.props.appointments.slice().sort((a,b) => {
            return new Date(a.datetime) - new Date(b.datetime);
        });

        this.formatAppointments(appointments);

        return (
            <main className="page-container">
                <h1 className="page-title">Please, select an available option</h1>

                {appointments && appointments.length && this.drawCalendar()}
            </main>
        )
    }
};

const mapStateToProps = ({appointments}) => ({
    appointments: appointments.doctorAppointments,
    error: appointments.doctorAppointmentsError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadAppointments: () => loadAppointments()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AvailableAppointments);