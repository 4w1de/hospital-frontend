import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { APPOINTMENT_URL } from '../../common/constans/urls';
import { TITLE_APPOINTMENT } from '../../common/constans/titleHeaderTable';
import socket from '../../utils/socketIO';

const Appointment = (props) => {
    document.title = 'Appointment';
    let [page, setPage] = useState(1);
    let [appointments, setAppointments] = useState([]);
    let [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { isAuth } = props.users;
    const { role } = props.users.user;

    useEffect(() => {
        axios.get(`${APPOINTMENT_URL}?page=${page}`).then((res) => {
            setAppointments(res.data.appointment);
            setTotal(res.data.total);
        });
    }, [page]);

    useEffect(() => {
        socket.on('appointList', (data) => {
            setAppointments(data.appointment);
            setTotal(data.total);
            setPage(1);
        });
    }, [socket, page]);

    const nextPage = () => {
        let np = page + 1;
        if (np <= Math.ceil(total / 5)) {
            setPage(page + 1);
        }
    };
    const prevPage = () => {
        let pp = page - 1;
        if (pp > 0) {
            setPage(page - 1);
        }
    };
    const deleteById = async (id) => {
        if (window.confirm('Delete this appointment?')) {
            axios
                .delete(`${APPOINTMENT_URL}${id}`, {
                    headers: { Authorization: localStorage.getItem('token') },
                })
                .then(() => {
                    alert('Appointment deleted');
                    socket.emit('appoint');
                });
            await setPage(page + 1);
            setPage(1);
        }
    };
    return (
        <div className="cont">
            <div>
                {isAuth && role <= 1 && (
                    <div
                        className="add"
                        onClick={() => {
                            navigate('/add-appointment');
                        }}>
                        Add appointment
                        <AiFillPlusCircle size={20} />
                    </div>
                )}
                <table border="0">
                    <thead>
                        <tr>
                            <th style={{ width: 150 }}>
                                {TITLE_APPOINTMENT.DATE}
                            </th>
                            <th style={{ width: 100 }}>
                                {TITLE_APPOINTMENT.START}
                            </th>
                            <th style={{ width: 100 }}>
                                {TITLE_APPOINTMENT.END}
                            </th>
                            <th style={{ width: 300 }}>
                                {TITLE_APPOINTMENT.CUSTOMER}
                            </th>
                            <th style={{ width: 300 }}>
                                {TITLE_APPOINTMENT.EMPLOYEE}
                            </th>
                            <th style={{ width: 50 }}>
                                {TITLE_APPOINTMENT.OPTIONS}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length
                            ? appointments.map((a) => {
                                  return (
                                      <tr key={a.id}>
                                          <td className="td-center">
                                              {new Date(
                                                  a.date,
                                              ).toLocaleDateString('en-US')}
                                          </td>
                                          <td className="td-center">
                                              {a.start}
                                          </td>
                                          <td className="td-center">{a.end}</td>
                                          <td className="td-center">
                                              {a.customer.name}
                                          </td>
                                          <td className="td-center">
                                              {a.employee.name}
                                          </td>
                                          {isAuth && role <= 1 ? (
                                              <td className="td-center">
                                                  <AiFillEdit
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() => {
                                                          navigate(`${a.id}`);
                                                      }}
                                                  />
                                                  <AiFillDelete
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() =>
                                                          deleteById(a.id)
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
                <div className="cont-pignation">
                    <div className="prev-next" onClick={prevPage}>
                        {'<-'}
                    </div>
                    <div className="page">{page}</div>
                    <div className="prev-next" onClick={nextPage}>
                        {'->'}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
};

export default connect(mapStateToProps, null)(Appointment);
