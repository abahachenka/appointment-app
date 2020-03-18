import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {searchClinic} from '../actions/appointments';

class NewAppointment extends React.Component {
    constructor(props) {
        super();

        this.state = {
            search: null
        };

        this.onChange = this.onChange.bind(this);
        this.searchClinic = this.searchClinic.bind(this);
    }

    searchClinic(event) {
        event.preventDefault();

        this.props.searchClinic(this.state.search);
    }

    onChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => ({
            search: { ...prevState.search, [name]: value },
        }));
    }

    render() {
        return (
            <main className="page-container">
                <h1 className="page-title">Enter your home address</h1>
                <form action="#" className="address-form" onSubmit={this.searchClinic}>
                    <input type="text" name="place" placeholder="place" onChange={this.onChange} />
                    <input type="text" name="street" placeholder="street" onChange={this.onChange} />
                    <input type="text" name="building" placeholder="building" onChange={this.onChange} />
                    <input type="submit" value="Search" />
                </form>

                {this.props.error && (
                    <p class="error">{this.props.error}</p>
                )}

                {this.props.clinics.length && (
                    <section className="search-results">
                        <h2 className="page-subtitle">Search results</h2>
                        <ul className="search-results-list category-list">
                            {this.props.clinics.map((clinic, index) => {
                                const url = '/clinic/' + clinic.alias; // change to alias

                                return (
                                    <li key={index}>
                                        <Link to={url}>{clinic.name}</Link>
                                        {clinic.address && (<p>Address: {clinic.address}</p>)} 
                                        {clinic.phoneNumber && (<p>Phone Number: {clinic.phoneNumber}</p>)}
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )}
            </main>
        )
    }
}


NewAppointment.propTypes = {
    clinics: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    searchClinic: PropTypes.func
}

const mapStateToProps = ({appointments}) => ({
    clinics: appointments.clinics,
    error: appointments.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    searchClinic: (params) => searchClinic(params)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);

