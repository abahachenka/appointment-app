import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';

class DoctorsCategory extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const categoryName = this.props.match.params.categoryName;

        return (
            <main className="account-page page-container">
            <ul className="breadcrumbs">
                <li>
                    <a href="#">{this.props.clinicName}</a>
                    <span className="separator">></span>
                </li>
                <li>
                    <a href="#">Doctor Specialisations</a>
                    <span className="separator">></span>
                </li>
                <li>{categoryName}</li>
            </ul>

            <section className="doctors data-section">
                <header className="data-section-header">
                    <h1 className="data-section-title">{categoryName}</h1>
                    <button className="data-section-btn">Invite</button>
                </header>

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
                        <tr>
                            <td>White</td>
                            <td>Anna</td>
                            <td>Mrs.</td>
                            <td>234</td>
                            <td>anna.white@gmail.com</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Kim</td>
                            <td>Paul</td>
                            <td>Mr.</td>
                            <td>125</td>
                            <td>p.kim1990@yahoo.com</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Rich</td>
                            <td>Johnatan</td>
                            <td>Mr.</td>
                            <td>453</td>
                            <td>johnatan_rich86@gmail.com</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Woods</td>
                            <td>Jane</td>
                            <td>Mrs.</td>
                            <td>324</td>
                            <td>jane.woods@mail.com</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Fog</td>
                            <td>Kate</td>
                            <td>Mrs.</td>
                            <td>206</td>
                            <td>kate-fog@aol.co.uk</td>
                            <td>Active</td>
                        </tr>
                        <tr className="disabled">
                            <td>Lisa</td>
                            <td>McCormack</td>
                            <td>Mrs.</td>
                            <td>310</td>
                            <td>mccormack_lisa@gmail.com</td>
                            <td>Invited</td>
                        </tr>
                        <tr className="disabled">
                            <td>Grunewald</td>
                            <td>Johanes</td>
                            <td>Mr.</td>
                            <td>315</td>
                            <td>j.grunewald@web.de</td>
                            <td>Invited</td>
                        </tr>
                        <tr className="disabled">
                            <td>Orange</td>
                            <td>Helen</td>
                            <td>Mrs.</td>
                            <td>110</td>
                            <td>helen.orange777@gmail.com</td>
                            <td>Invited</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
        )
    }
}

DoctorsCategory.propTypes = {
    clinicName: PropTypes.string
}

const mapStateToProps = (state) => ({
    clinicName: state.signIn.account && state.signIn.account.name
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewCategory: () => {}
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsCategory);