import axios from 'axios';

import { ACTIONS_LIST_CUSTOMER } from '../../../common/constans/actionsCustomer';

const getAllAction = (customer) => {
    return {
        type: ACTIONS_LIST_CUSTOMER.GET_ALL_CUSTOMER,
        customer,
    };
};

export const getAll = (url) => {
    return (dispatch) => {
        axios
            .get(url, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                return response;
            })
            .then((customer) => {
                return dispatch(getAllAction(customer));
            });
    };
};
