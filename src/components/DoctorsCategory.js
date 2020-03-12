import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadAccount, loadCategory} from '../actions/account';
import Modal from './Modal';
import DoctorsList from './DoctorsList';

class DoctorsCategory extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.loadCategory(this.props.match.params.categoryAlias);

        // load account data
        if (!this.props.clinicName) {
            this.props.loadAccount();
        }
    }

    render() {
        const categoryName = this.props.activeCategory && this.props.activeCategory.categoryName;

        return (
            <main className="account-page page-container">
            <ul className="breadcrumbs">
                <li>
                    <a href="/clinic-account">{this.props.clinicName}</a>
                    <span className="separator">></span>
                </li>
                <li>
                    <a href="/clinic-account">Doctor Specialisations</a>
                    <span className="separator">></span>
                </li>
                <li>{categoryName}</li>
            </ul>

            <section className="doctors data-section">
                <header className="data-section-header">
                    <h1 className="data-section-title">{categoryName}</h1>
                    <button className="data-section-btn">Invite</button>
                </header>
                <DoctorsList items={this.props.doctors} />
            </section>
        </main>
        )
    }
}

DoctorsCategory.propTypes = {
    clinicName: PropTypes.string,
    activeCategory: PropTypes.object,
    activeCategoryError: PropTypes.string,
    doctors: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => ({
    clinicName: state.signIn.account && state.signIn.account.name,
    activeCategory: state.doctorCategories.activeCategory,
    activeCategoryError: state.doctorCategories.activeCategoryError,
    doctors: state.doctorCategories.doctors
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewCategory: () => {},
    loadAccount: () => loadAccount(),
    loadCategory: (alias) => loadCategory(alias)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsCategory);