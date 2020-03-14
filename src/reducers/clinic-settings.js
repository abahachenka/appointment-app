import { 
    GET_ADDRESS_LIST_SUCCESS,
    GET_ADDRESS_LIST_ERROR
} from '../constants/action-types';

const initialState = {
    error: '',
    addressList: []
};

const clinicSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS_LIST_SUCCESS:
            return {
                ...state,
                addressList: action.payload.addressList
            }

        case GET_ADDRESS_LIST_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default: 
          return state;
        }
};

export default clinicSettingsReducer;