import '../styles.css';

import { useState, useEffect } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { TITLE_CUSTOMER } from '../../common/constans/titleHeaderTable';
import { CUSTOMER_URL } from '../../common/constans/urls';
import socket from '../../utils/socketIO';

const UpdateCustomer = (props) => {
    document.title = 'Customer';
    let { id } = useParams();
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    const navigate = useNavigate();

    const headers = {
        headers: { Authorization: localStorage.getItem('token') },
    };

    useEffect(() => {
        axios
            .get(`${CUSTOMER_URL}${id}`, headers)
            .then((response) => {
                return response;
            })
            .then(({ data }) => {
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
            });
    }, []);

    const handleSubmit = () => {
        axios
            .patch(
                `${CUSTOMER_URL}${id}`,
                {
                    name,
                    email,
                    phone,
                    address,
                },
                {
                    headers: { Authorization: localStorage.getItem('token') },
                },
            )
            .then((response) => {
                alert('Customer changed');
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
                    CHANGE
                    <AiFillRightCircle size={20} />
                </div>
            </form>
        </div>
    );
};

export default UpdateCustomer;
