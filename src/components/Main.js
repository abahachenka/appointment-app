import React from 'react';
import { Switch, Route } from 'react-router-dom';

// admin components
import ClinicRegistration from './admin/ClinicRegistration';
import ClinicAccountPage from './admin/ClinicAccountPage';
import DoctorAccount from './admin/DoctorAccount';
import DoctorsCategory from './admin/DoctorsCategory';
import SignIn from './admin/SignIn';
import AcceptInvitation from './admin/AcceptInvitation';
import ClinicSettings from './admin/ClinicSettings';
import DoctorSettings from './admin/DoctorSettings';

// user components
import Home from './Home';
import NewAppointment from './NewAppointment';
import ClinicDoctorCategories from './ClinicDoctorCategories';
import AvailableAppointments from './AvailableAppointments';
import NewAppointmentComplete from './NewAppointmentComplete';
import CancelAppointment from './CancelAppointment';
import NotFound from './NotFound';

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/new-appointment' component={NewAppointment}/>
        <Route exact path='/new-appointment/clinic/:clinicAlias' component={ClinicDoctorCategories}/>
        <Route exact path='/new-appointment/clinic/:clinicAlias/:categoryAlias' component={AvailableAppointments}/>
        <Route exact path='/new-appointment/clinic/:clinicAlias/:categoryAlias/complete' component={NewAppointmentComplete}/>
        <Route exact path='/cancel-appointment' component={CancelAppointment}/>
        <Route path='/register' component={ClinicRegistration}/>
        <Route path='/admin' component={SignIn} />
        <Route exact path='/clinic-account' component={ClinicAccountPage} />
        <Route path={`/clinic-account/category/:categoryAlias`} component={DoctorsCategory} />
        <Route path={`/clinic-account/settings`} component={ClinicSettings} />
        <Route path={'/accept-invitation/:token'} component={AcceptInvitation} />
        <Route exact path='/doctor-account' component={DoctorAccount} />
        <Route path={'/doctor-account/settings'} component={DoctorSettings} />
        <Route component={NotFound} />
    </Switch>
)

export default Main;