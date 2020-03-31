import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createNewDoctorCategory} from '../../actions/account';
import Modal from './Modal';

class DoctorCategories extends React.Component {
    constructor() {
        super();

        this.state = {
            isModalDisplayed: false,
            newCategory: null
        };

        this.showModal = this.showModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
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
        this.setState({
            newCategory: event.target.value,
        });
    }

    closeModal() {
        this.setState({
            newCategory: null,
            isModalDisplayed: false
        });
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
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
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
                    <Modal title="Add New Doctors Category" onClose={this.closeModal}>
                        <form onSubmit={this.addNewCategory}>
                            <input type="text" placeholder="Category Name" onChange={this.onChange}/>
                            <input type="submit" value="Add"/>
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
    error: PropTypes.string
}

const mapStateToProps = ({doctorCategories}) => ({
    categories: doctorCategories.categories,
    error: doctorCategories.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewCategory: (categoryName) => createNewDoctorCategory(categoryName)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCategories);