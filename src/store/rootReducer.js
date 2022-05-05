import { combineReducers } from 'redux';
import { customer } from './reducers/customer';
import { employee } from './reducers/employee';
import { departments } from './reducers/departments';
import { appointment } from './reducers/appointment';
import { users } from './reducers/users';

const rootReducer = combineReducers({
    customer,
    employee,
    departments,
    appointment,
    users,
});

export default rootReducer;
