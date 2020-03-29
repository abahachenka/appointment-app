import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {searchClinic, saveClinic} from '../actions/appointments';

class NewAppointment extends React.Component {
    constructor() {
        super();

        this.state = {
            search: null
        };

        this.onChange = this.onChange.bind(this);
        this.searchClinic = this.searchClinic.bind(this);
    }

    componentDidMount() {
        window.onbeforeunload = () => {
            return 'Your progress will be lost!';
        }
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

    onClinicSelect(event, clinic, url) {
        this.props.saveClinic(clinic);
        this.props.history.push(url);
    }

    render() {
        return (
            <main className="page-container address-search">
                <h1 className="page-title">Enter your home address</h1>
                <form action="#" className="address-form" onSubmit={this.searchClinic}>
                    <input type="text" name="place" list="cities" placeholder="Place" onChange={this.onChange} />
                    <datalist id="cities">
                        <option value="Minsk" />
                        <option value="Homel" />
                        <option value="Mogilev" />
                        <option value="Brest" />
                        <option value="Vitebsk" />
                        <option value="Grodno" />
                    </datalist>

                    <input type="text" name="street" placeholder="Street" onChange={this.onChange} />
                    <input type="text" name="building" placeholder="Building" onChange={this.onChange} />
                    <input type="submit" value="Search" />
                </form>

                {this.props.error && (
                    <p className="error">{this.props.error}</p>
                )}

                {this.props.clinics.length ? (
                    <section className="search-results">
                        <h2 className="page-subtitle">Search results</h2>
                        <ul className="search-results-list category-list">
                            {this.props.clinics.map((clinic, index) => {
                                const url = '/new-appointment/clinic/' + clinic.alias; // change to alias

                                return (
                                    <li key={index} onClick={this.onClinicSelect.bind(this, event, clinic, url)}>
                                        <h3 className="category-name">
                                            <Link to={url}>
                                                {clinic.name}
                                            </Link>
                                        </h3>
                                        {clinic.address && (<p><strong>Address:</strong> {clinic.address}</p>)} 
                                        {clinic.phoneNumber && (<p><strong>Phone Number:</strong> {clinic.phoneNumber}</p>)}
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                ) : null}
            </main>
        )
    }
}


NewAppointment.propTypes = {
    clinics: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    searchClinic: PropTypes.func,
    saveClinic: PropTypes.func,
    history: PropTypes.object
}

const mapStateToProps = ({appointments}) => ({
    clinics: appointments.clinics,
    error: appointments.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    searchClinic: (params) => searchClinic(params),
    saveClinic: (clinicId) => saveClinic(clinicId)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);

