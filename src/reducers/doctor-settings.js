import { 
    GET_DOCTOR_ADDRESS_LIST_SUCCESS,
    GET_DOCTOR_ADDRESS_LIST_ERROR
} from '../constants/action-types';

const initialState = {
    error: '',
    addressList: []
};

const doctorSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTOR_ADDRESS_LIST_SUCCESS:
            return {
                ...state,
                addressList: action.payload.addressList
            }

        case GET_DOCTOR_ADDRESS_LIST_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default: 
          return state;
        }
};

export default doctorSettingsReducer;