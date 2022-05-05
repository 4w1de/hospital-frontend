import '../styles.css';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { CUSTOMER_URL } from '../../common/constans/urls';
import { TITLE_CUSTOMER } from '../../common/constans/titleHeaderTable';
import { getAll } from '../../store/actions/customer';

const Customer = (props) => {
    document.title = 'Customer';
    let [page, setPage] = useState(1);
    const navigate = useNavigate();
    const SIZE = 5;
    const { isAuth } = props.users;
    const { role } = props.users.user;

    useEffect(() => {
        props.getAllCustomer(`${CUSTOMER_URL}?page=${page}&size=${SIZE}`);
    }, [page]);

    const nextPage = () => {
        let np = page + 1;
        if (np <= Math.ceil(props.customer.data.total / SIZE)) {
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
        if (window.confirm('Delete this customer?')) {
            axios
                .delete(`${CUSTOMER_URL}${id}`, {
                    headers: { Authorization: localStorage.getItem('token') },
                })
                .then(() => {
                    alert('Customer deleted');
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
                            navigate('/add-customer');
                        }}>
                        Add customer
                        <AiFillPlusCircle size={20} />
                    </div>
                )}

                <table border="0">
                    <thead>
                        <tr>
                            <th style={{ width: 100 }}>
                                {TITLE_CUSTOMER.NAME}
                            </th>
                            <th style={{ width: 200 }}>
                                {TITLE_CUSTOMER.EMAIL}
                            </th>
                            <th style={{ width: 120 }}>
                                {TITLE_CUSTOMER.PHONE}
                            </th>
                            <th>{TITLE_CUSTOMER.ADDRESS}</th>
                            <th style={{ width: 50 }}>
                                {TITLE_CUSTOMER.OPTIONS}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.customer.data &&
                        props.customer.data.customer &&
                        props.customer.data.customer.length
                            ? props.customer.data.customer.map((c) => {
                                  return (
                                      <tr key={c.id}>
                                          <td className="td-center">
                                              {c.name}
                                          </td>
                                          <td className="td-center">
                                              {c.email}
                                          </td>
                                          <td>{c.phone}</td>
                                          <td>{c.address}</td>
                                          {isAuth && role <= 1 ? (
                                              <td className="td-center">
                                                  <AiFillEdit
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() => {
                                                          navigate(`${c.id}`);
                                                      }}
                                                  />
                                                  <AiFillDelete
                                                      className="option-button"
                                                      size={20}
                                                      onClick={() =>
                                                          deleteById(c.id)
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
        customer: state.customer,
        users: state.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCustomer: (url) => dispatch(getAll(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
