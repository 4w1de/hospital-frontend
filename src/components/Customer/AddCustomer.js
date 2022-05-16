import '../styles.css';

import { useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TITLE_CUSTOMER } from '../../common/constans/titleHeaderTable';
import { CUSTOMER_URL } from '../../common/constans/urls';
import socket from '../../utils/socketIO';
import headers from '../../utils/header';

const AddCustomer = (props) => {
    document.title = 'Customer';
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        axios
            .post(
                CUSTOMER_URL,
                {
                    id: String(Date.now()).slice(-9),
                    name,
                    email,
                    phone,
                    address,
                },
                headers,
            )
            .then((response) => {
                alert('Customer added');
                socket.emit('cust');
                navigate('/customer');
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

    return (
        <div className="cont">
            <form>
                <label>
                    {TITLE_CUSTOMER.NAME}:
                    <input value={name} onChange={handleChangeName} />
                </label>
                <label>
                    {TITLE_CUSTOMER.EMAIL}:
                    <input
                        type={email}
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </label>
                <label>
                    {TITLE_CUSTOMER.PHONE}:
                    <input value={phone} onChange={handleChangePhone} />
                </label>
                <label>
                    {TITLE_CUSTOMER.ADDRESS}:
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

export default AddCustomer;
