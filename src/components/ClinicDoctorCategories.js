import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {loadDoctorCategories, saveDoctorCategory} from '../actions/appointments';

class ClinicDoctorCategories extends React.Component {
    constructor(props) {
        super();
    }
    
    componentDidMount() {
        this.props.loadCategories();
    }

    saveCategory(event, categoryId) {
        this.props.saveDoctorCategory(categoryId);
    }

    render() {
        return (
            <main className="page-container">
                <h1 className="page-title">What kind of doctor do you need to visit?</h1>
                {this.props.categories && this.props.categories.length && (
                    <ul className="doctor-specialisations-list category-list">
                        {this.props.categories.map((category, index) => {
                            return (
                                <li key={index}>
                                    <Link 
                                        to={this.props.location.pathname + '/' + category.categoryAlias} 
                                        onClick={this.saveCategory.bind(this, event, category._id)}>
                                        {category.categoryName}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </main>
        )
    }
}

ClinicDoctorCategories.propTypes = {
    categories: PropTypes.array,
    error: PropTypes.string,
    saveDoctorCategory: PropTypes.func,
    loadCategories: PropTypes.func
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