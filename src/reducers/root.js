import { combineReducers } from 'redux';
import clinicRegistration from './clinic-registration';
import signIn from './sign-in';
import doctorCategories from './doctor-categories';

const rootReducer = combineReducers({
    clinicRegistration,
    signIn,
    doctorCategories
});

export default rootReducer;