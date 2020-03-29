import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadAppointments, saveAppointment} from '../actions/appointments';

class AvailableAppointments extends React.Component {
    constructor() {
        super();

        this.formatAppointments = this.formatAppointments.bind(this);
        this.drawCalendar = this.drawCalendar.bind(this);
        this.getDays = this.getDays.bind(this);
        this.drawAppointment = this.drawAppointment.bind(this);
        this.drawAppointmentsList = this.drawAppointmentsList.bind(this);
        this.drawFilters = this.drawFilters.bind(this);
        this.showDistrictDoctorAppointments = this.showDistrictDoctorAppointments.bind(this);
        this.showAllAppointments = this.showAllAppointments.bind(this);
    }

    componentDidMount() {
        if (!this.props.selectedCategory) {
            this.props.history.push('/new-appointment');
            return;
        }

        this.props.loadAppointments(this.props.selectedCategory._id);
    }

    formatAppointments(src) {
        this.appointmentsTree = {};

        src.map((appointment) => {
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

    saveAppointment(appointment) {
        this.props.saveAppointment(appointment);
        this.props.history.push(this.props.location.pathname + '/complete');
    }

    drawAppointment(appointment, index) {
        const time = moment(appointment.datetime).format('hh:mm');
        const doctor = appointment.doctor;
        const doctorName = doctor.title + '. ' + doctor.firstName + ' ' + doctor.lastName;

        return (
            <li key={index} onClick={this.saveAppointment.bind(this, appointment)}>
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

    showDistrictDoctorAppointments() {
        this.props.loadAppointments(this.props.selectedCategory._id, {address: this.props.userHomeAddress});
    }

    showAllAppointments() {
        this.props.loadAppointments(this.props.selectedCategory._id);
    }

    drawFilters() {
        return (
            <div className="doctor-filters-wrapper">
                <div className="doctor-filter">
                    <label>
                        <input type="radio" name="doctorFilter" defaultChecked onClick={this.showAllAppointments} />All Doctors
                    </label>
                </div>

                <div className="doctor-filter">
                    <label>
                        <input type="radio" name="doctorFilter" onClick={this.showDistrictDoctorAppointments} />My District Doctor
                    </label>
                    <p className="doctor-filter-hint">Your district doctor is automatically determined according to your home address</p>
                </div>
            </div>
        )
    } 

    drawCalendar() {
        const years = Object.keys(this.appointmentsTree);
        const html = [];

        years.forEach((year) => {
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
        const currentPath = this.props.location.pathname.split('/').pop();
        const categoryNeedsFiltres = this.props.categoriesWithFilters.indexOf(currentPath) !== -1;

        this.formatAppointments(appointments);

        return (
            <main className="page-container">
                <h1 className="page-title">Please, select an available option.</h1>
                {categoryNeedsFiltres ? this.drawFilters() : null}
                {appointments && appointments.length ? this.drawCalendar() : (
                    <p>Sorry. No appointments are available at the moment.</p>
                )}
            </main>
        )
    }
}

AvailableAppointments.propTypes = {
    selectedCategory: PropTypes.object,
    appointments: PropTypes.arrayOf(PropTypes.object),
    categoriesWithFilters: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    loadAppointments: PropTypes.func,
    saveAppointment: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
    userHomeAddress: PropTypes.object
}

const mapStateToProps = ({appointments}) => ({
    userHomeAddress: appointments.userHomeAddress,
    selectedCategory: appointments.selectedDoctorCategory,
    categoriesWithFilters: appointments.categoriesWithFilters,
    appointments: appointments.doctorAppointments,
    error: appointments.doctorAppointmentsError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadAppointments: (categoryId, filter) => loadAppointments(categoryId, filter),
    saveAppointment: (appointment) => saveAppointment(appointment)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AvailableAppointments);