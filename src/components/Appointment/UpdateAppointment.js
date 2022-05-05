import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { TITLE_APPOINTMENT } from '../../common/constans/titleHeaderTable';
import {
    APPOINTMENT_URL,
    EMPLOYEE_URL,
    CUSTOMER_URL,
} from '../../common/constans/urls';
import { getAll as getCustomer } from '../../store/actions/customer';
import { getAll as getEmployee } from '../../store/actions/employee';

const UpdateAppointment = (props) => {
    document.title = 'Appointment';
    let { id } = useParams();
    const navigate = useNavigate();

    let [date, setDate] = useState('');
    let [start, setStart] = useState('');
    let [end, setEnd] = useState('');
    let [customerId, setCustomerId] = useState(0);
    let [employeeId, setEmployeeId] = useState(0);

    useEffect(() => {
        props.getAllCustomer(CUSTOMER_URL);
        props.getAllEmployee(EMPLOYEE_URL);
        axios
            .get(`${APPOINTMENT_URL}${id}`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                return response;
            })
            .then(({ data }) => {
                setDate(new Date(data.date).toLocaleDateString('en-CA'));
                setStart(data.start);
                setEnd(data.end);
                setCustomerId(data.customerId);
                setEmployeeId(data.employeeId);
            });
    }, []);

    const handleSubmit = () => {
        axios
            .patch(
                `${APPOINTMENT_URL}${id}`,
                {
                    date,
                    start,
                    end,
                    customerId,
                    employeeId,
                },
                {
                    headers: { Authorization: localStorage.getItem('token') },
                },
            )
            .then((response) => {
                alert('Appointment changed');
                navigate('/appointment');
            });
    };

    const handleChangeDate = (e) => {
        setDate(e.target.value);
    };
    const handleChangeStart = (e) => {
        setStart(e.target.value);
    };
    const handleChangeEnd = (e) => {
        setEnd(e.target.value);
    };
    const handleChangeCustomerId = (e) => {
        setCustomerId(e.target.value);
    };
    const handleChangeEmployeeId = (e) => {
        setEmployeeId(e.target.value);
    };

    return (
        <div className="cont">
            <form>
                <label>
                    {TITLE_APPOINTMENT.DATE}:
                    <input
                        type="date"
                        value={date}
                        onChange={handleChangeDate}
                    />
                </label>
                <label>
                    {TITLE_APPOINTMENT.START}:
                    <input
                        type="time"
                        value={start}
                        onChange={handleChangeStart}
                    />
                </label>
                <label>
                    {TITLE_APPOINTMENT.END}:
                    <input type="time" value={end} onChange={handleChangeEnd} />
                </label>
                <label>
                    {TITLE_APPOINTMENT.CUSTOMER}:
                    <select
                        value={customerId}
                        onChange={handleChangeCustomerId}>
                        <option value={0} disabled>
                            Select customer
                        </option>
                        {props.customer.data &&
                        props.customer.data.customer &&
                        props.customer.data.customer.length
                            ? props.customer.data.customer.map((c) => {
                                  return (
                                      <option key={c.id} value={c.id}>
                                          {c.name}
                                      </option>
                                  );
                              })
                            : null}
                    </select>
                </label>
                <label>
                    {TITLE_APPOINTMENT.EMPLOYEE}:
                    <select
                        value={employeeId}
                        onChange={handleChangeEmployeeId}>
                        <option value={0} disabled>
                            Select employee
                        </option>
                        {props.employee.data && props.employee.data.length
                            ? props.employee.data.map((e) => {
                                  return (
                                      <option key={e.id} value={e.id}>
                                          {e.name}
                                      </option>
                                  );
                              })
                            : null}
                    </select>
                </label>
                <div className="add-button" onClick={handleSubmit}>
                    CHANGE
                    <AiFillRightCircle size={20} />
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        employee: state.employee,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCustomer: (url) => dispatch(getCustomer(url)),
        getAllEmployee: (url) => dispatch(getEmployee(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAppointment);
