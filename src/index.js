import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <main className="home-page page-container container">
                    <div className="column column-new">
                        <button>New Appointment</button>
                    </div>
                    <div className="column column-cancel">
                        <button>Cancel an appointment</button>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('contents'));