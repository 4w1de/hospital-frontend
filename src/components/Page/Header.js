import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/actions/users';

const Header = (props) => {
    const user = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { isAuth } = user;
    const { role, name } = user.user;
    const navigate = useNavigate();
    return (
        <header className="cont-header">
            <nav>
                <div
                    onClick={() => {
                        navigate('/appointment');
                    }}>
                    Appointment
                </div>
                {isAuth && (
                    <div
                        onClick={() => {
                            navigate('/customer');
                        }}>
                        Customer
                    </div>
                )}
                <div
                    onClick={() => {
                        navigate('/employee');
                    }}>
                    Employee
                </div>
                <div
                    onClick={() => {
                        navigate('/departments');
                    }}>
                    Departments
                </div>
            </nav>
            {!isAuth && (
                <div
                    className="user-info"
                    onClick={() => {
                        navigate('/auth');
                    }}>
                    LOGIN
                    <RiLoginCircleFill style={{ margin: 'auto 0' }} size={20} />
                </div>
            )}
            {isAuth && (
                <div
                    className="user-info"
                    onClick={() => dispatch(logoutAction())}>
                    {name}
                    <RiLogoutCircleFill
                        style={{ margin: 'auto 0' }}
                        size={20}
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
