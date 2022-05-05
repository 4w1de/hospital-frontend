import { ACTIONS_LIST_EMPLOYEE } from '../../common/constans/actionsEmployee';

export function employee(state = [], action) {
    switch (action.type) {
        case ACTIONS_LIST_EMPLOYEE.GET_ALL_EMPLOYEE:
            return action.employee;
        default:
            return state;
    }
}
