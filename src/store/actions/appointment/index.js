import axios from 'axios';

import { ACTIONS_LIST_APPOINTMENT } from '../../../common/constans/actionsAppointment';

const getAllAction = (appointment) => {
    return {
        type: ACTIONS_LIST_APPOINTMENT.GET_ALL_APPOINTMENT,
        appointment,
    };
};

export const getAll = (url) => {
    return (dispatch) => {
        axios
            .get(url)
            .then((response) => {
                return response;
            })
            .then((appointment) => {
                return dispatch(getAllAction(appointment));
            });
    };
};
