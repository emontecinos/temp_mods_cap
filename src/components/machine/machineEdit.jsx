import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import MachineForm from './machineForm';

const EditInfo = (props) => {
  const { setEditState, idMachine } = props;
  const [currentInfo, setCurrentInfo] = useState({
    subtype_id: '',
    type_id: '',
    year: '',
    error: {
      alreadyExists: null,
    },
    incompleteForm: null,
  });
  const currentUser = useSelector((state) => state.userInformation);

  const handleInfo = (currentData) => {
    setCurrentInfo({
      ...currentInfo,
      type_id: currentData.type_id,
      subtype_id: currentData.subtype_id,
      year: currentData.year,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/machines/${idMachine}`,
      'GET',
      (data) => handleInfo(data.machine),
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
      setCurrentInfo({
        ...currentInfo,
        error: { ...currentInfo.error, alreadyExists: true },
      });
    } else if (response.status === 200) {
      setCurrentInfo({
        ...currentInfo,
        error: { ...currentInfo.error, alreadyExists: null },
        messageError: null,
      });
      setEditState(false);
    } else {
      setCurrentInfo({
        ...currentInfo,
        error: { ...currentInfo.error, alreadyExists: null },
        messageError: null,
      });
      // eslint-disable-next-line no-console
      console.log('Error en el request');
    }
  };

  const fetchData = async (event) => {
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admin-machines/${idMachine}`,
      'PATCH',
      handleResponse,
      currentUser.token,
      null,
      JSON.stringify({
        type_id: currentInfo.type_id,
        subtype_id: currentInfo.subtype_id,
        year: currentInfo.year,
      }),
      event,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(currentInfo).some((x) => x === '')) {
      setCurrentInfo({
        ...currentInfo,
        error: { ...currentInfo.error, alreadyExists: null },
        incompleteForm: true,
      });
    } else if (Object.values(currentInfo.error).some((x) => x)) {
      setCurrentInfo({
        ...currentInfo,
        error: { ...currentInfo.error, alreadyExists: null },
        incompleteForm: null,
      });
    } else {
      setCurrentInfo({
        ...currentInfo,
        error: {
          ...currentInfo.error,
          incompleteForm: null,
          alreadyExist: null,
        },
      });
      fetchData(e);
    }
  };

  return (
    <MachineForm
      data={currentInfo}
      setData={setCurrentInfo}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditInfo;
