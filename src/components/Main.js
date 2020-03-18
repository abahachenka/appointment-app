import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ClinicRegistration from './ClinicRegistration';
import ClinicAccountPage from './ClinicAccountPage';
import DoctorAccount from './DoctorAccount';
import DoctorsCategory from './DoctorsCategory';
import SignIn from './SignIn';
import AcceptInvitation from './AcceptInvitation';
import ClinicSettings from './ClinicSettings';
import NewAppointment from './NewAppointment';
import CancelAppointment from './CancelAppointment';

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/new-appointment' component={NewAppointment}/>
        <Route exact path='/cancel-appointment' component={CancelAppointment}/>
        <Route path='/register' component={ClinicRegistration}/>
        <Route path='/admin' component={SignIn} />
        <Route exact path='/clinic-account' component={ClinicAccountPage} />
        <Route path={`/clinic-account/category/:categoryAlias`} component={DoctorsCategory} />
        <Route path={`/clinic-account/settings`} component={ClinicSettings} />
        <Route path={'/accept-invitation/:token'} component={AcceptInvitation} />
        <Route exact path='/doctor-account' component={DoctorAccount} />
    </Switch>
)

export default Main;