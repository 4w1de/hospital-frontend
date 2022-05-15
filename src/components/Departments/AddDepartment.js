import '../styles.css';

import { useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TITLE_DEPARTMENT } from '../../common/constans/titleHeaderTable';
import { DEPARTMENTS_URL } from '../../common/constans/urls';
import socket from '../../utils/socketIO';

const AddDepartment = (props) => {
    document.title = 'Departments';
    let [name, setName] = useState('');
    let [address, setAddress] = useState('');
    const navigate = useNavigate();

    const headers = {
        headers: { Authorization: localStorage.getItem('token') },
    };

    const handleSubmit = () => {
        axios
            .post(
                DEPARTMENTS_URL,
                {
                    id: String(Date.now()).slice(-9),
                    name,
                    address,
                },
                headers,
            )
            .then((response) => {
                alert('Department added');
                socket.emit('depart');
                navigate('/departments');
            });
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div className="cont">
            <form>
                <label>
                    {TITLE_DEPARTMENT.NAME}:
                    <input value={name} onChange={handleChangeName} />
                </label>
                <label>
                    {TITLE_DEPARTMENT.ADDRESS}:
                    <input value={address} onChange={handleChangeAddress} />
                </label>
                <div className="add-button" onClick={handleSubmit}>
                    ADD
                    <AiFillRightCircle size={20} />
                </div>
            </form>
        </div>
    );
};

export default AddDepartment;
