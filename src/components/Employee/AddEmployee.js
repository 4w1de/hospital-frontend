import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TITLE_EMPLOYEE } from '../../common/constans/titleHeaderTable';
import { EMPLOYEE_URL, DEPARTMENTS_URL } from '../../common/constans/urls';
import { getAll } from '../../store/actions/departments';

const AddEmployee = (props) => {
    document.title = 'Employee';
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    let [departmentId, setDepartmentId] = useState(0);
    let [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        props.getAllDepartments(DEPARTMENTS_URL);
    }, []);

    const handleSubmit = () => {
        axios
            .post(
                EMPLOYEE_URL,
                {
                    id: String(Date.now()).slice(-9),
                    name,
                    email,
                    phone,
                    address,
                    departmentId,
                    password,
                },
                {
                    headers: { Authorization: localStorage.getItem('token') },
                },
            )
            .then((response) => {
                alert('Employee added');
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
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
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
                        type="email"
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
                        {props.departments.data && props.departments.data.length
                            ? props.departments.data.map((d) => {
                                  return (
                                      <option key={d.id} value={d.id}>
                                          {d.name}
                                      </option>
                                  );
                              })
                            : null}
                    </select>
                </label>
                <label>
                    {TITLE_EMPLOYEE.PASSWORD}
                    <input
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </label>
                <div className="add-button" onClick={handleSubmit}>
                    ADD
                    <AiFillRightCircle size={20} />
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        departments: state.departments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDepartments: (url) => dispatch(getAll(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);