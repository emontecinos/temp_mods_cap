import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import TypeForm from './typeForm';

const initialState = {
  name: '',
  description: '',
  error: {
    alreadyExists: null,
  },
  incompleteForm: null,
};

const EditType = (props) => {
  const { setEditState, idType } = props;
  const [currentType, setCurrentType] = useState(initialState);
  const currentUser = useSelector((state) => state.userInformation);

  const handleInfo = (currentData) => {
    setCurrentType({
      ...currentType,
      id: currentData.id,
      name: currentData.name,
      description: currentData.description,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/types/${idType}`,
      'GET',
      (data) => handleInfo(data.type[0]),
      currentUser.token,
      signal,
      null,
      null,
    );

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [currentUser.token]);

  const handleResponse = (response) => {
    if (response.status === 400) {
      setCurrentType({
        ...currentType,
        error: { ...currentType.error, alreadyExists: true },
      });
    } else if (response.status === 200) {
      setCurrentType({
        ...currentType,
        error: { ...currentType.error, alreadyExists: null },
        messageError: null,
      });
      setEditState(false);
    } else {
      setCurrentType({
        ...currentType,
        error: { ...currentType.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/types/${currentType.id}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        name: currentType.name,
        description: currentType.description,
      }),
      event,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(currentType).some((x) => x === '')) {
      setCurrentType({
        ...currentType,
        error: { ...currentType.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(currentType.error).some((x) => x)) {
      setCurrentType({
        ...currentType,
        error: { ...currentType.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      setCurrentType({
        ...currentType,
        error: {
          ...currentType.error,
          incompleteForm: null,
          alreadyExist: null,
        },
      });
      fetchData(e);
    }
  };

  return (
    <TypeForm
      data={currentType}
      setData={setCurrentType}
      handleSubmit={handleSubmit}
      state="edit"
    />
  );
};

export default EditType;
