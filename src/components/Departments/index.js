import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { DEPARTMENTS_URL } from '../../common/constans/urls';
import { TITLE_DEPARTMENT } from '../../common/constans/titleHeaderTable';
import { getAll } from '../../store/actions/departments';

const Departments = (props) => {
    document.title = 'Departments';
    let [del, setDel] = useState(false);
    const navigate = useNavigate();
    const { isAuth } = props.users;
    const { role } = props.users.user;

    useEffect(() => {
        props.getAllDepartments(DEPARTMENTS_URL);
    }, [del]);

    const deleteById = async (id) => {
        if (window.confirm('Delete this department?')) {
            axios
                .delete(`${DEPARTMENTS_URL}${id}`, {
                    headers: { Authorization: localStorage.getItem('token') },
                })
                .then(() => {
                    alert('Department deleted');
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
                            navigate('/add-department');
                        }}>
                        Add department
                        <AiFillPlusCircle size={20} />
                    </div>
                )}

                <table border="0">
                    <thead>
                        <tr>
                            <th style={{ width: 300 }}>
                                {TITLE_DEPARTMENT.NAME}
                            </th>
                            <th style={{ width: 650 }}>
                                {TITLE_DEPARTMENT.ADDRESS}
                            </th>
                            <th style={{ width: 50 }}>
                                {TITLE_DEPARTMENT.OPTIONS}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.departments.data && props.departments.data.length
                            ? props.departments.data.map((d) => {
                                  return (
                                      <tr key={d.id}>
                                          <td>{d.name}</td>
                                          <td>{d.address}</td>
                                          {isAuth && role === 0 ? (
                                              <td className="td-center">
                                                  <AiFillEdit
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() => {
                                                          navigate(`${d.id}`);
                                                      }}
                                                  />
                                                  <AiFillDelete
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() =>
                                                          deleteById(d.id)
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
        departments: state.departments,
        users: state.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDepartments: (url) => dispatch(getAll(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
