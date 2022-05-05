import axios from 'axios';

import { LOGIN, LOGOUT } from '../../../common/constans/actionsUsers';
import { AUTH_URL } from '../../../common/constans/urls';

export const loginAction = (user) => {
    return {
        type: LOGIN,
        user,
    };
};
export const logoutAction = () => ({ type: LOGOUT });

export const login = (url, email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(url, { email, password });
            localStorage.setItem('token', response.data.token);
            return dispatch(loginAction(response));
        } catch (e) {
            alert('Error email or password');
        }
    };
};
export const auth = () => {
    return async (dispatch) => {
        try {
            if (!localStorage.getItem('token')) {
                return;
            }
            const response = await axios.get(AUTH_URL, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            localStorage.setItem('token', response.data.token);
            return dispatch(loginAction(response));
        } catch (e) {
            alert(e);
            localStorage.removeItem('token');
        }
    };
};
