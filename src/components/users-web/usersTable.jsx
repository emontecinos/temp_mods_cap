import React from 'react';
import MaterialTable from 'material-table';
import { Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import effectAsyncHandler from '../../assets/async/asyncFunction';
import tableIcons from '../../assets/icons/tableIcons';
import exportFile from '../../utils/exportCsv';

const styles = {
  table: { width: '100%', marginTop: '2%' },
};

const TableAdmins = (props) => {
  const { handleEdit } = props;
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const handleExport = (allColumns) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/admins`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const columns = allColumns.filter(
          (columnDef) => columnDef.export !== false,
        );
        const exportedData = result?.data?.admins.map((rowData) =>
          columns.map((columnDef) => rowData[columnDef.field]),
        );
        exportFile(columns, exportedData, 'web-users');
      });
  };

  const handleRole = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'operator':
        return 'Operador';
      default:
        return 'Observador';
    }
  };

  const handlerBlock = () => {
    history.push('/');
    history.push('/users-web');
  };

  // eslint-disable-next-line no-console
  const handleClickBlock = (id, isBlocked, event) => {
    const url = isBlocked ? 'unblock' : 'block';
    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins/${url}/${id}`,
      'PATCH',
      handlerBlock,
      currentUser.token,
      null,
      JSON.stringify({}),
      event,
    );
  };

  const columns = [
    {
      title: 'Nombre',
      field: 'name',
      render: (rowData) => (
        <Typography style={rowData.blocked ? { color: '#A9A9A9' } : null}>
          {rowData.name}
        </Typography>
      ),
    },
    {
      title: 'Correo',
      field: 'email',
      render: (rowData) => (
        <Typography style={rowData.blocked ? { color: '#A9A9A9' } : null}>
          {rowData.email}
        </Typography>
      ),
    },
    {
      title: 'Tipo',
      field: 'role',
      lookup: {
        admin: 'Administrador',
        operator: 'Operador',
        observer: 'Observador',
      },
      render: (rowData) => (
        <Typography style={rowData.blocked ? { color: '#A9A9A9' } : null}>
          {handleRole(rowData.role)}
        </Typography>
      ),
    },
    { title: '', field: '', sorting: false, filter: false, width: '5%' },
    {
      title: '',
      field: 'edit',
      sorting: false,
      export: false,
      width: '7%',
      render: (rowData) => (
        <IconButton
          aria-label="edit"
          onClick={(e) => handleEdit(e, rowData)}
          disabled={!!rowData.blocked}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      title: '',
      field: 'bloqueo',
      width: '15%',
      sorting: false,
      export: false,
      render: (rowData) => (
        <Button
          onClick={(e) => handleClickBlock(rowData.id, rowData.blocked, e)}
        >
          {rowData.blocked ? 'Desbloquear' : ' Bloquear'}
        </Button>
      ),
    },
  ];

  return (
    <MaterialTable
      title="Usuarios"
      columns={columns}
      icons={tableIcons}
      data={(query) =>
        new Promise((resolve) => {
          const url = `${
            process.env.REACT_APP_API_URL
          }/api/v1/admins?pageSize=${query.pageSize}&pageNumber=${
            query.page
          }&orderBy=${query.orderBy?.field}&orderDirection=${
            query.orderDirection
          }&search=${query.search}&filters=${JSON.stringify(query.filters)}`;
          fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser.token}`,
            },
          })
            .then((response) => response.json())
            .then((result) => {
              resolve({
                data: result?.data?.admins,
                page: query.page,
                totalCount: parseInt(result?.totalCount[0].count, 10),
              });
            });
        })
      }
      style={styles.table}
      options={{
        rowStyle: (rowData) => ({
          color: rowData.blocked ? { color: '#A9A9A9' } : null,
        }),
        exportButton: true,
        exportCsv: handleExport,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sin conversaciones encontradas',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Conversaciones',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default TableAdmins;
