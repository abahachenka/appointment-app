import { combineReducers } from 'redux';
import clinicRegistration from './clinic-registration';
import signIn from './sign-in';
import doctorCategories from './doctor-categories';
import clinicSettings from './clinic-settings';
import appointments from './appointments';

const rootReducer = combineReducers({
    clinicRegistration,
    signIn,
    doctorCategories,
    clinicSettings,
    appointments
});

export default rootReducer;