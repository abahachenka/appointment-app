import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ClinicRegistration from './ClinicRegistration';
import ClinicAccountPage from './ClinicAccountPage';
import SignIn from './SignIn';

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={ClinicRegistration}/>
        <Route path='/admin' component={SignIn}/>
        <Route path='/clinic-account' component={ClinicAccountPage}/>
    </Switch>
)

export default Main;