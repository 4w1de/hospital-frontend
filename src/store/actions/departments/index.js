import axios from 'axios';

import { ACTIONS_LIST_DEPARTMENTS } from '../../../common/constans/actionsDepartments';

const getAllAction = (departments) => {
    return {
        type: ACTIONS_LIST_DEPARTMENTS.GET_ALL_DEPARTMENTS,
        departments,
    };
};

export const getAll = (url) => {
    return (dispatch) => {
        axios
            .get(url)
            .then((response) => {
                return response;
            })
            .then((departments) => {
                return dispatch(getAllAction(departments));
            });
    };
};
