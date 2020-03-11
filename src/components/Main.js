import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ClinicRegistration from './ClinicRegistration';
import ClinicAccountPage from './ClinicAccountPage';
import DoctorsCategory from './DoctorsCategory';
import SignIn from './SignIn';

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={ClinicRegistration}/>
        <Route path='/admin' component={SignIn}/>
        <Route exact path='/clinic-account' component={ClinicAccountPage}/>
        <Route path={`/clinic-account/category/:categoryAlias`} component={DoctorsCategory}/>
    </Switch>
)

export default Main;