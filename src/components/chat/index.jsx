import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import ChatCard from './chatCard';

const IndividualChat = (props) => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [textValue, setTextValue] = useState('');
  const currentUser = useSelector((state) => state.userInformation);

  const { match } = props;
  const uid = match.params.id;

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins-users/${uid}`,
      'GET',
      (d) => setDataUser(d.user),
      currentUser.token,
      signal,
      null,
      null,
    );

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/user_messages/${uid}`,
      'GET',
      (d) => setData(d.messages),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('La conexión ha fallado');
    }
    setData((prevMessages) => [
      ...prevMessages,
      { fromAdmin: 1, message: textValue, timestamp: +new Date() },
    ]);
    setTextValue('');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (textValue.trim()) {
      effectAsyncHandler(
        `${process.env.REACT_APP_API_URL}/api/v1/admins/user_messages/${uid}`,
        'POST',
        handleResponse,
        currentUser.token,
        null,
        JSON.stringify({
          message: textValue,
        }),
        null,
      );
    }
  };

  return (
    <ChatCard
      data={data}
      dataUser={dataUser}
      textValue={textValue}
      setTextValue={setTextValue}
      handleSend={handleSend}
    />
  );
};

export default IndividualChat;
