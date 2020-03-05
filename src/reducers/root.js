import { combineReducers } from 'redux';
import clinicRegistration from './clinic-registration';
import signIn from './sign-in';

const rootReducer = combineReducers({
    clinicRegistration,
    signIn
});

export default rootReducer;