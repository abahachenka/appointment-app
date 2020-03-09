import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createNewDoctorCategory} from '../actions/account';
import Modal from './Modal';

class DoctorCategories extends React.Component {
    constructor(props) {
        super();

        this.state = {
            isModalDisplayed: false,
            newCategory: null
        }

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
        return (
            <React.Fragment>
                <section className="doctor-specialisations">
                    <h2 className="page-subtitle">Doctor Specialisations</h2>
                    <button onClick={this.showModal}>Add New</button>

                    <div className="doctor-specialisations-list">
                        <ul>
                            <li><a href="#">Neurologist</a></li>
                            <li><a href="#">Therapist</a></li>
                            <li><a href="#">Dentist</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Gynecologist</a></li>
                            <li><a href="#">Ophtalmologist</a></li>
                            <li><a href="#">Urologist</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Endocrynologist</a></li>
                            <li><a href="#">Surgeon</a></li>
                        </ul>
                    </div>
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

}

const mapStateToProps = ({signIn}) => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewCategory: (categoryName) => createNewDoctorCategory(categoryName)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCategories);