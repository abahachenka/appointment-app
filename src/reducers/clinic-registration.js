import { 
    REGISTER_CLINIC_SUCCESS,
    REGISTER_CLINIC_PENDING,
    REGISTER_CLINIC_ERROR,
    REGISTER_RESET_ERROR
} from '../constants/action-types';

const initialState = {
    isPending: false,
    isCompleted: false,
    error: null
};

const clinicRegistrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_CLINIC_SUCCESS:
            return {
                ...state,
                isPending: false,
                isCompleted: true
            };

        case REGISTER_CLINIC_PENDING:
            return {
                ...state,
                isPending: true
            };

        case REGISTER_CLINIC_ERROR:
            return {
                ...state,
                isPending: false,
                error: action.payload.error
            }

        case REGISTER_RESET_ERROR:
            return {
                ...state,
                error: null
            }
    
    default: 
      return state;
  }
  
};

export default clinicRegistrationReducer;