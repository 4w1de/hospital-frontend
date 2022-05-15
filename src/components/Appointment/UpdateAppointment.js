import '../styles.css';

import { useEffect, useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { TITLE_APPOINTMENT } from '../../common/constans/titleHeaderTable';
import {
    APPOINTMENT_URL,
    EMPLOYEE_URL,
    CUSTOMER_URL,
} from '../../common/constans/urls';

const UpdateAppointment = (props) => {
    document.title = 'Appointment';
    let { id } = useParams();
    const navigate = useNavigate();

    let [date, setDate] = useState('');
    let [start, setStart] = useState('');
    let [end, setEnd] = useState('');
    let [customerId, setCustomerId] = useState(0);
    let [employeeId, setEmployeeId] = useState(0);
    let [customers, setCustomers] = useState([]);
    let [employee, setEmployee] = useState([]);

    const headers = {
        headers: { Authorization: localStorage.getItem('token') },
    };

    useEffect(() => {
        axios.get(CUSTOMER_URL, headers).then((res) => {
            setCustomers(res.data.customer);
        });
        axios.get(EMPLOYEE_URL, headers).then((res) => {
            setEmployee(res.data);
        });
        axios
            .get(`${APPOINTMENT_URL}${id}`, headers)
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
                        {customers.length
                            ? customers.map((c) => {
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
                        {employee.length
                            ? employee.map((e) => {
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

export default UpdateAppointment;
