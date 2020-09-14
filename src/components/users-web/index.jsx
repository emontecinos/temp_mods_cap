import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonGroup from './buttonGroup';
import Table from './usersTable';

const WebUsers = () => {
  const history = useHistory();

  const handleEdit = (e, user) => {
    e.preventDefault();
    history.push(`/users-web/edit/${user.id}`);
  };

  return (
    <div>
      <ButtonGroup />
      <Table handleEdit={handleEdit} />
    </div>
  );
};

export default WebUsers;
