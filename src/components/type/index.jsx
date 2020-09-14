import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import TypeCard from './typeCard';

const initialState = {
  name: ' ',
  description: ' ',
};

const Type = (props) => {
  const currentUser = useSelector((state) => state.userInformation);
  const [type, setType] = useState(initialState);
  const [editState, setEditState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { match } = props;
  const idType = match.params.id;

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/types/${idType}`,
      'GET',
      (data) => setType(data.type[0]),
      currentUser.token,
      signal,
      null,
      null,
    );
    setIsLoading(false);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [editState, currentUser.token]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditState(true);
  };

  return (
    <TypeCard
      data={type}
      editState={editState}
      setEditState={setEditState}
      handleEdit={handleEdit}
      idType={idType}
      isLoading={isLoading}
    />
  );
};

export default Type;
