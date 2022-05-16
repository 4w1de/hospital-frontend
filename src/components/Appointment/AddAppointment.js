import '../styles.css';

import { useEffect, useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TITLE_APPOINTMENT } from '../../common/constans/titleHeaderTable';
import {
    APPOINTMENT_URL,
    EMPLOYEE_URL,
    CUSTOMER_URL,
} from '../../common/constans/urls';
import socket from '../../utils/socketIO';
import headers from '../../utils/header';

const AddAppointment = (props) => {
    document.title = 'Appointment';
    const navigate = useNavigate();

    let [date, setDate] = useState('');
    let [start, setStart] = useState('');
    let [end, setEnd] = useState('');
    let [customerId, setCustomerId] = useState(0);
    let [employeeId, setEmployeeId] = useState(0);
    let [customers, setCustomers] = useState([]);
    let [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios.get(CUSTOMER_URL, headers).then((res) => {
            setCustomers(res.data.customer);
        });
        axios.get(EMPLOYEE_URL, headers).then((res) => {
            setEmployee(res.data);
        });
    }, []);

    const handleSubmit = () => {
        axios
            .post(
                APPOINTMENT_URL,
                {
                    id: String(Date.now()).slice(-9),
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
                alert('Appointment added');
                socket.emit('appoint');
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
                    ADD
                    <AiFillRightCircle size={20} />
                </div>
            </form>
        </div>
    );
};

export default AddAppointment;
