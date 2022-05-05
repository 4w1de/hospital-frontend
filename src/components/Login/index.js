import '../styles.css';

import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LOGIN_URL } from '../../common/constans/urls';
import { login } from '../../store/actions/users';

const Login = (props) => {
    document.title = 'Login';
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        props.loginUser(LOGIN_URL, email, password).then((response) => {
            if (response) {
                navigate('/');
            }
        });
    };

    return (
        <div className="cont">
            <form>
                <label>
                    Email:
                    <br />
                    <input value={email} onChange={handleChangeEmail} />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </label>
                <div className="add-button" onClick={handleSubmit}>
                    LOGIN
                </div>
                <div
                    style={{
                        marginBottom: 20,
                    }}>
                    <div
                        style={{
                            cursor: 'pointer',
                            display: 'inline',
                        }}
                        onClick={() => {
                            navigate('/');
                        }}>
                        Main page
                    </div>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (url, email, password) =>
            dispatch(login(url, email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
