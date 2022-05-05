import { ACTIONS_LIST_CUSTOMER } from '../../common/constans/actionsCustomer';

export function customer(state = [], action) {
    switch (action.type) {
        case ACTIONS_LIST_CUSTOMER.GET_ALL_CUSTOMER:
            return action.customer;
        default:
            return state;
    }
}
