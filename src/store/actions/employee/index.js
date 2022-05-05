import axios from 'axios';

import { ACTIONS_LIST_EMPLOYEE } from '../../../common/constans/actionsEmployee';

const getAllAction = (employee) => {
    return {
        type: ACTIONS_LIST_EMPLOYEE.GET_ALL_EMPLOYEE,
        employee,
    };
};

export const getAll = (url) => {
    return (dispatch) => {
        axios
            .get(url)
            .then((response) => {
                return response;
            })
            .then((employee) => {
                return dispatch(getAllAction(employee));
            });
    };
};
