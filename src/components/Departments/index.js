import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { DEPARTMENTS_URL } from '../../common/constans/urls';
import { TITLE_DEPARTMENT } from '../../common/constans/titleHeaderTable';
import socket from '../../utils/socketIO';
import headers from '../../utils/header';

const Departments = (props) => {
    document.title = 'Departments';
    let [del, setDel] = useState(false);
    let [departments, setDepartments] = useState([]);

    const navigate = useNavigate();
    const { isAuth } = props.users;
    const { role } = props.users.user;

    const getAll = () => {
        axios.get(DEPARTMENTS_URL).then((res) => {
            setDepartments(res.data);
        });
    };

    useEffect(() => {
        getAll();
    }, [del]);

    useEffect(() => {
        socket.on('departList', () => {
            getAll();
        });
    }, [socket]);

    const deleteById = async (id) => {
        if (window.confirm('Delete this department?')) {
            axios.delete(`${DEPARTMENTS_URL}${id}`, headers).then(() => {
                socket.emit('depart');
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
                        {departments.length
                            ? departments.map((d) => {
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
        users: state.users,
    };
};

export default connect(mapStateToProps, null)(Departments);
