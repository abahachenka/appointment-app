import { combineReducers } from 'redux';
import clinicRegistration from './clinic-registration';
import signIn from './sign-in';
import doctorCategories from './doctor-categories';
import clinicSettings from './clinic-settings';
import doctorSettings from './doctor-settings';
import doctorAppointments from './doctor-appointments';
import appointments from './appointments';

const rootReducer = combineReducers({
    clinicRegistration,
    signIn,
    doctorCategories,
    clinicSettings,
    doctorSettings,
    doctorAppointments,
    appointments
});

export default rootReducer;