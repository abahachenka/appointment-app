import PropTypes from 'prop-types';

class DoctorsList extends React.Component {
    render() {
        const doctors = this.props.items;

        return doctors && doctors.length ? (
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
        ): null;
    }
}

DoctorsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default DoctorsList;