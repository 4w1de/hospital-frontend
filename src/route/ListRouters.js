import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Page from '../components/Page';
import Customer from '../components/Customer';
import Employee from '../components/Employee';
import Departments from '../components/Departments';
import Appointment from '../components/Appointment';

import AddCustomer from '../components/Customer/AddCustomer';
import AddEmployee from '../components/Employee/AddEmployee';
import AddDepartment from '../components/Departments/AddDepartment';
import AddAppointment from '../components/Appointment/AddAppointment';

import UpdateCustomer from '../components/Customer/UpdateCustomer';
import UpdateEmployee from '../components/Employee/UpdateEmployee';
import UpdateDepartment from '../components/Departments/UpdateDepartment';
import UpdateAppointment from '../components/Appointment/UpdateAppointment';

import Login from '../components/Login';

const ListRouters = (props) => {
    const user = useSelector((state) => state.users);
    const { isAuth } = user;
    const { role } = user.user;
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Page>
                        <Appointment />
                    </Page>
                }
            />
            <Route
                path="appointment"
                element={
                    <Page>
                        <Appointment />
                    </Page>
                }
            />
            {isAuth && (
                <Route
                    path="customer"
                    element={
                        <Page>
                            <Customer />
                        </Page>
                    }
                />
            )}
            <Route
                path="employee"
                element={
                    <Page>
                        <Employee />
                    </Page>
                }
            />
            <Route
                path="departments"
                element={
                    <Page>
                        <Departments />
                    </Page>
                }
            />

            {isAuth && role <= 1 && (
                <Route
                    path="add-appointment"
                    element={
                        <Page>
                            <AddAppointment />
                        </Page>
                    }
                />
            )}
            {isAuth && role <= 1 && (
                <Route
                    path="add-customer"
                    element={
                        <Page>
                            <AddCustomer />
                        </Page>
                    }
                />
            )}
            {isAuth && role === 0 && (
                <Route
                    path="add-employee"
                    element={
                        <Page>
                            <AddEmployee />
                        </Page>
                    }
                />
            )}
            {isAuth && role === 0 && (
                <Route
                    path="add-department"
                    element={
                        <Page>
                            <AddDepartment />
                        </Page>
                    }
                />
            )}

            {isAuth && role <= 1 && (
                <Route
                    path="appointment/:id"
                    element={
                        <Page>
                            <UpdateAppointment />
                        </Page>
                    }
                />
            )}
            {isAuth && role <= 1 && (
                <Route
                    path="customer/:id"
                    element={
                        <Page>
                            <UpdateCustomer />
                        </Page>
                    }
                />
            )}
            {isAuth && role === 0 && (
                <Route
                    path="employee/:id"
                    element={
                        <Page>
                            <UpdateEmployee />
                        </Page>
                    }
                />
            )}
            {isAuth && role === 0 && (
                <Route
                    path="departments/:id"
                    element={
                        <Page>
                            <UpdateDepartment />
                        </Page>
                    }
                />
            )}
            <Route path="auth" element={<Login />} />
        </Routes>
    );
};

export default ListRouters;
