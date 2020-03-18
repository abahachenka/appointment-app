import { Link } from 'react-router-dom';

const Home = () => (
    <main className="page-container home-page">
        <div className="column column-new">
            <Link className="home-button" to="/new-appointment">New Appointment</Link>
        </div>
        <div className="column column-cancel">
            <Link className="home-button" to="/cancel-appointment">Cancel an appointment</Link>
        </div>
    </main>
)

export default Home;