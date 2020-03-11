import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadAccount, loadCategory} from '../actions/account';
import Modal from './Modal';

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
        const doctors = this.props.doctors;

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

                {doctors && doctors.length ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Title</th>
                                <th>Room</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {doctors.map((doctor, index) => {
                            const isDisabled = doctor.status === 'invited';

                            return (
                                <tr key={index} className={isDisabled ? "disabled": null}>
                                    <td>{doctor.lastName}</td>
                                    <td>{doctor.firstName}</td>
                                    <td>{doctor.title}</td>
                                    <td>{doctor.room}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.status}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                ): null}
                
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