import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {cancelAppointment} from '../actions/appointments';

class CancelAppointment extends React.Component {
    constructor(props) {
        super();

        this.state = {
            orderNumber: null
        };

        this.onChange = this.onChange.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    onChange(event) {
        this.state.orderNumber = event.target.value;
    }

    cancelAppointment(event) {
        event.preventDefault();
        this.props.cancelAppointment(this.state.orderNumber);
    }

    resetForm() {
        this.cancelForm.reset();
    }

    componentDidUpdate() {
        if (this.props.isCancelled) {
            alert('Your appointment has been successfully cancelled!');
            this.resetForm();
        }
    }

    render() {
        return (
            <main className="page-container container">
                <h1 className="page-title">Please, enter your order number</h1>

                <p className="error">{this.props.error}</p>
                <form ref={(el) => this.cancelForm = el}  className="cancel-appointment-form" onSubmit={this.cancelAppointment}>
                    <input type="text" placeholder="Order Number" onChange={this.onChange}/>
                    <input type="submit" value="Cancel Appointment" />
                </form>

                <div className="cancel-sample">
                    <img src="img/cancel-sample.png" alt="" />
                </div>

            </main>
        );
    }
}

CancelAppointment.propTypes = {
    error: PropTypes.string,
    cancelAppointment: PropTypes.func
}

const mapStateToProps = ({appointments}) => ({
    isCancelled: appointments.isAppointmentCancelled,
    error: appointments.cancelError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    cancelAppointment: (orderNumber) => cancelAppointment(orderNumber)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CancelAppointment);