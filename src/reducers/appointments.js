import {
    SEARCH_CLINIC_SUCCESS, 
    SEARCH_CLINIC_ERROR
} from '../constants/action-types';

const initialState = {
    clinics: [],
    error: null
};

const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_CLINIC_SUCCESS: 
            return {
                ...state,
                clinics: action.payload.clinics
            }

        case SEARCH_CLINIC_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        
        default:
            return state;
        }
};

export default appointmentsReducer;