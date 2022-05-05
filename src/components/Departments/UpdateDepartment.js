import '../styles.css';

import { useState, useEffect } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { TITLE_DEPARTMENT } from '../../common/constans/titleHeaderTable';
import { DEPARTMENTS_URL } from '../../common/constans/urls';

const UpdateDepartment = (props) => {
    document.title = 'Departments';
    let { id } = useParams();
    let [name, setName] = useState('');
    let [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${DEPARTMENTS_URL}${id}`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                return response;
            })
            .then(({ data }) => {
                setName(data.name);
                setAddress(data.address);
            });
    }, []);

    const handleSubmit = () => {
        axios
            .patch(
                `${DEPARTMENTS_URL}${id}`,
                {
                    name,
                    address,
                },
                {
                    headers: { Authorization: localStorage.getItem('token') },
                },
            )
            .then((response) => {
                alert('Department changed');
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
                    CHANGE
                    <AiFillRightCircle size={20} />
                </div>
            </form>
        </div>
    );
};

export default UpdateDepartment;
