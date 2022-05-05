import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { TITLE_EMPLOYEE } from '../../common/constans/titleHeaderTable';
import { EMPLOYEE_URL, DEPARTMENTS_URL } from '../../common/constans/urls';
import { getAll } from '../../store/actions/departments';

const UpdateEmployee = (props) => {
    document.title = 'Employee';
    let { id } = useParams();
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    let [departmentId, setDepartmentId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        props.getAllDepartments(DEPARTMENTS_URL);
        axios
            .get(`${EMPLOYEE_URL}${id}`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
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
                {
                    headers: { Authorization: localStorage.getItem('token') },
                },
            )
            .then((response) => {
                alert('Employee changed');
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
        departments: state.departments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDepartments: (url) => dispatch(getAll(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployee);
