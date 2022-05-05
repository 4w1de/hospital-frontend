import { ACTIONS_LIST_APPOINTMENT } from '../../common/constans/actionsAppointment';

export function appointment(state = [], action) {
    switch (action.type) {
        case ACTIONS_LIST_APPOINTMENT.GET_ALL_APPOINTMENT:
            return action.appointment;
        default:
            return state;
    }
}
