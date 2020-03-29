import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {loadDoctorCategories, saveDoctorCategory} from '../actions/appointments';

class ClinicDoctorCategories extends React.Component {
    componentDidMount() {
        this.props.loadCategories();
    }

    saveCategory(event, categoryId) {
        this.props.saveDoctorCategory(categoryId);
    }

    onCategorySelect(event, url) {
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
                                <li key={index} onClick={this.onCategorySelect.bind(this, event, url)}>
                                    <h2 className="category-name">
                                        <Link 
                                            to={url} 
                                            onClick={this.saveCategory.bind(this, event, category._id)}>
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
    saveDoctorCategory: PropTypes.func,
    loadCategories: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = ({appointments}) => ({
    categories: appointments.doctorCategories,
    error: appointments.doctorCategoriesError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    saveDoctorCategory: (categoryId) => saveDoctorCategory(categoryId),
    loadCategories: () => loadDoctorCategories()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDoctorCategories);