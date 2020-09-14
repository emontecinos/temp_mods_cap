import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeLastPage } from '../../redux/actions';
import OrderUserBox from './orderUserBox';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const OrderUser = (props) => {
  const { order } = props;
  const [user, setUser] = useState('initialState');
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (order.user_id > 0) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins-users/${order.user_id}`,
        'GET',
        (data) => setUser(data.user),
        currentUser.token,
        signal,
        null,
        null,
      );

      setIsLoading(false);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [order.user_id]);

  const handleUser = (e, userId) => {
    e.preventDefault();

    dispatch(changeLastPage(`/orders/${order.id}`));
    history.push(`/users-mobile/${userId}`);
  };

  return (
    <OrderUserBox user={user} handleUser={handleUser} isLoading={isLoading} />
  );
};

export default OrderUser;
