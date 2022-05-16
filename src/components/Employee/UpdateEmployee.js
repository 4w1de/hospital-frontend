import '../styles.css';

import { useEffect, useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { TITLE_EMPLOYEE } from '../../common/constans/titleHeaderTable';
import { EMPLOYEE_URL, DEPARTMENTS_URL } from '../../common/constans/urls';
import socket from '../../utils/socketIO';
import headers from '../../utils/header';

const UpdateEmployee = (props) => {
    document.title = 'Employee';
    let { id } = useParams();
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    let [departmentId, setDepartmentId] = useState(0);
    let [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(DEPARTMENTS_URL).then((res) => {
            setDepartments(res.data);
        });
        axios
            .get(`${EMPLOYEE_URL}${id}`, headers)
            .then((response) => {
                return response;
            })
            .then(({ data }) => {
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                setDepartmentId(data.departmentId);
            });
    }, []);

    const handleSubmit = () => {
        axios
            .patch(
                `${EMPLOYEE_URL}${id}`,
                {
                    name,
                    email,
                    phone,
                    address,
                    departmentId,
                },
                headers,
            )
            .then((response) => {
                alert('Employee changed');
                socket.emit('empl');
                navigate('/employee');
            });
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleChangeDepartmentId = (e) => {
        setDepartmentId(e.target.value);
    };

    return (
        <div className="cont">
            <form>
                <label>
                    {TITLE_EMPLOYEE.NAME}:
                    <input value={name} onChange={handleChangeName} />
                </label>
                <label>
                    {TITLE_EMPLOYEE.EMAIL}:
                    <input
                        type={email}
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </label>
                <label>
                    {TITLE_EMPLOYEE.PHONE}:
                    <input value={phone} onChange={handleChangePhone} />
                </label>
                <label>
                    {TITLE_EMPLOYEE.ADDRESS}:
                    <input value={address} onChange={handleChangeAddress} />
                </label>
                <label>
                    {TITLE_EMPLOYEE.DEPARTMENT}:
                    <select
                        value={departmentId}
                        onChange={handleChangeDepartmentId}>
                        <option value={0} disabled>
                            Select department
                        </option>
                        {departments.length
                            ? departments.map((d) => {
                                  return (
                                      <option key={d.id} value={d.id}>
                                          {d.name}
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

export default UpdateEmployee;
