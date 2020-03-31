import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import {
    createNewDoctorCategory, 
    resetAddCategoryError
} from '../../actions/account';

const initialState = {
    isModalDisplayed: false,
    isFormDisabled: true,
    newCategory: null
}

class DoctorCategories extends React.Component {
    constructor() {
        super();

        this.state = {...initialState};

        this.showModal = this.showModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.categories && this.props.categories.length !== prevProps.categories.length) {
            this.closeModal();
        }
    }

    showModal() {
        this.setState({
            isModalDisplayed: true
        });
    }

    addNewCategory(event) {
        event.preventDefault();
        this.props.createNewCategory(this.state.newCategory);
    }

    onChange(event) {
        if (this.props.addCategoryError) {
            this.props.resetAddCategoryError();
        }

        this.setState({
            newCategory: event.target.value,
        }, this.checkEmpty);
    }

    checkEmpty() {
        let isFormDisabled = !this.state.newCategory;

        this.setState(() => ({
            isFormDisabled
        }));
    }

    closeModal() {
        this.setState({...initialState});
    }

    render() {
        const categories = this.props.categories;

        return (
            <React.Fragment>
                <section className="doctor-specialisations">
                    <h2 className="page-subtitle">Doctor Categories</h2>
                    <button onClick={this.showModal} className="button-primary">Add New</button>
                    
                    <p className="error">{this.props.error}</p>

                    {categories && categories.length ? (
                        <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Active</th>
                                        <th>Invited</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {categories.map((category, index) => {
                                    const link = '/clinic-account/category/' + category.categoryAlias;

                                    return (
                                        <tr key={index}>
                                            <td><Link to={link}>{category.categoryName}</Link></td>
                                            <td>{category.doctors.active}</td>
                                            <td>{category.doctors.invited}</td>
                                            <td>{category.doctors.active + category.doctors.invited}</td>
                                            <td className="controls">
                                                <button disabled>Edit</button>
                                                <button disabled>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ): null}
                </section>
                {this.state.isModalDisplayed ? (
                    <Modal title="Add New Category" onClose={this.closeModal}>
                        <p className="error">{this.props.addCategoryError}</p>
                        <form onSubmit={this.addNewCategory}>
                            <input type="text" placeholder="Category Name" onChange={this.onChange}/>
                            <input type="submit" value="Add" disabled={this.state.isFormDisabled}/>
                        </form>
                    </Modal>
                ): null}
                
            </React.Fragment>
        )
    }
}

DoctorCategories.propTypes = {
    createNewCategory: PropTypes.func,
    categories: PropTypes.array,
    error: PropTypes.string,
    resetAddCategoryError: PropTypes.func
}

const mapStateToProps = ({doctorCategories}) => ({
    categories: doctorCategories.categories,
    error: doctorCategories.error,
    addCategoryError: doctorCategories.addCategoryError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewCategory: (categoryName) => createNewDoctorCategory(categoryName),
    resetAddCategoryError: () => resetAddCategoryError()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCategories);