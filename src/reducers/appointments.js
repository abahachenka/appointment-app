import { 
    LOAD_DOCTOR_APPOINTMENT_SUCCESS,
    LOAD_DOCTOR_APPOINTMENT_ERROR
} from '../constants/action-types';

const initialState = {
    items: [],
    error: null,
    isAppointmentCreated: false
};

const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DOCTOR_APPOINTMENT_SUCCESS:
            return {
                ...state,
                items: action.payload.appointments
            };

        case LOAD_DOCTOR_APPOINTMENT_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        
        
        default:
          return state;
        }
};

export default appointmentsReducer;