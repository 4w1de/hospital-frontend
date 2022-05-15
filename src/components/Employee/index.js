import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { EMPLOYEE_URL } from '../../common/constans/urls';
import { TITLE_EMPLOYEE } from '../../common/constans/titleHeaderTable';

const Employee = (props) => {
    document.title = 'Employee';
    let [del, setDel] = useState(false);
    let [employee, setEmployee] = useState([]);

    const navigate = useNavigate();
    const { isAuth } = props.users;
    const { role } = props.users.user;

    const headers = {
        headers: { Authorization: localStorage.getItem('token') },
    };

    useEffect(() => {
        axios.get(EMPLOYEE_URL).then((res) => {
            setEmployee(res.data);
        });
    }, [del]);

    const deleteById = async (id) => {
        if (window.confirm('Delete this employee?')) {
            axios.delete(`${EMPLOYEE_URL}${id}`, headers).then(() => {
                alert('Employee deleted');
            });
            setDel(del ? false : true);
        }
    };

    return (
        <div className="cont">
            <div>
                {isAuth && role === 0 && (
                    <div
                        className="add"
                        onClick={() => {
                            navigate('/add-employee');
                        }}>
                        Add employee
                        <AiFillPlusCircle size={20} />
                    </div>
                )}

                <table border="0">
                    <thead>
                        <tr>
                            <th style={{ width: 100 }}>
                                {TITLE_EMPLOYEE.NAME}
                            </th>
                            <th style={{ width: 200 }}>
                                {TITLE_EMPLOYEE.EMAIL}
                            </th>
                            <th style={{ width: 120 }}>
                                {TITLE_EMPLOYEE.PHONE}
                            </th>
                            <th>{TITLE_EMPLOYEE.ADDRESS}</th>
                            <th>{TITLE_EMPLOYEE.DEPARTMENT}</th>
                            <th style={{ width: 50 }}>
                                {TITLE_EMPLOYEE.OPTIONS}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.length
                            ? employee.map((e) => {
                                  return (
                                      <tr key={e.id}>
                                          <td className="td-center">
                                              {e.name}
                                          </td>
                                          <td className="td-center">
                                              {e.email}
                                          </td>
                                          <td>{e.phone}</td>
                                          <td>{e.address}</td>
                                          <td>{e.departments.name}</td>
                                          {isAuth && role === 0 ? (
                                              <td className="td-center">
                                                  <AiFillEdit
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() => {
                                                          navigate(`${e.id}`);
                                                      }}
                                                  />
                                                  <AiFillDelete
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() =>
                                                          deleteById(e.id)
                                                      }
                                                  />
                                              </td>
                                          ) : (
                                              <td className="td-center" />
                                          )}
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
};

export default connect(mapStateToProps, null)(Employee);
