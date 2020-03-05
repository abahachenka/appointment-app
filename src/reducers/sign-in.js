import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_ERROR,
    SIGN_IN_RESET_ERROR
} from '../constants/action-types';

const initialState = {
    isPending: false,
    isCompleted: false,
    error: null
};

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isPending: false,
                isCompleted: true
            };

        case SIGN_IN_PENDING:
            return {
                ...state,
                isPending: true
            };

        case SIGN_IN_ERROR:
            return {
                ...state,
                isPending: false,
                error: action.payload.error
            }

        case SIGN_IN_RESET_ERROR:
            return {
                ...state,
                error: null
            }
        default: 
           return state;
        }
};

export default signInReducer;