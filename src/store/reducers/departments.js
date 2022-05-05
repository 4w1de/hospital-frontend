import { ACTIONS_LIST_DEPARTMENTS } from '../../common/constans/actionsDepartments';

export function departments(state = [], action) {
    switch (action.type) {
        case ACTIONS_LIST_DEPARTMENTS.GET_ALL_DEPARTMENTS:
            return action.departments;
        default:
            return state;
    }
}
