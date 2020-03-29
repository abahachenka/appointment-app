import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {loadDoctorCategories, saveDoctorCategory} from '../actions/appointments';

class ClinicDoctorCategories extends React.Component {
    componentDidMount() {
        if (!this.props.selectedClinic) {
            this.props.history.push('/new-appointment');
            return;
        }

        const clinicId = this.props.selectedClinic._id;
        this.props.loadCategories(clinicId);
    }

    onCategorySelect(event, category, url) {
        this.props.saveDoctorCategory(category);
        this.props.history.push(url);
    }

    render() {
        return (
            <main className="page-container">
                <h1 className="page-title">What kind of doctor do you need to visit?</h1>
                {this.props.categories && this.props.categories.length ? (
                    <ul className="doctor-specialisations-list category-list">
                        {this.props.categories.map((category, index) => {
                            const url = this.props.location.pathname + '/' + category.categoryAlias;

                            return (
                                <li key={index} onClick={this.onCategorySelect.bind(this, event, category, url)}>
                                    <h2 className="category-name">
                                        <Link to={url}>
                                            {category.categoryName}
                                        </Link>
                                    </h2>
                                </li>
                            )
                        })}
                    </ul>
                ): null}
            </main>
        )
    }
}

ClinicDoctorCategories.propTypes = {
    categories: PropTypes.array,
    error: PropTypes.string,
    selectedClinic: PropTypes.object,
    saveDoctorCategory: PropTypes.func,
    loadCategories: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = ({appointments}) => ({
    selectedClinic: appointments.selectedClinic,
    categories: appointments.doctorCategories,
    error: appointments.doctorCategoriesError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    saveDoctorCategory: (category) => saveDoctorCategory(category),
    loadCategories: (clinicId) => loadDoctorCategories(clinicId)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDoctorCategories);