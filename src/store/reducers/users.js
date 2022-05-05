import { LOGIN, LOGOUT } from '../../common/constans/actionsUsers';

const initialState = {
    user: {},
    isAuth: false,
};

export function users(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.user.data.user, isAuth: true };
        case LOGOUT:
            localStorage.removeItem('token');
            return { ...state, user: {}, isAuth: false };
        default:
            return state;
    }
}
