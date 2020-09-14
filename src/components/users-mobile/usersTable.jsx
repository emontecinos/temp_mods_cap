import React from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';

import tableIcons from '../../assets/icons/tableIcons';
import exportFile from '../../utils/exportCsv';

const TableUsers = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.userInformation);

  const handleExport = (allColumns) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/admins-users`, {
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
        const exportedData = result?.data?.users.map((rowData) =>
          columns.map((columnDef) => rowData[columnDef.field]),
        );
        exportFile(columns, exportedData, 'mobile-users');
      });
  };

  const handleLink = (id) => {
    history.push(`/users-mobile/${id}`);
  };

  return (
    <MaterialTable
      title="Usuarios"
      columns={[
        {
          title: 'Id',
          field: 'id',
        },
        {
          title: 'Nombre',
          field: 'name',
        },
        {
          title: 'Rut',
          field: 'rut',
        },
        {
          title: 'Teléfono',
          field: 'phone',
        },
      ]}
      icons={tableIcons}
      data={(query) =>
        new Promise((resolve) => {
          const url = `${
            process.env.REACT_APP_API_URL
          }/api/v1/admins-users?pageSize=${query.pageSize}&pageNumber=${
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
                data: result?.data?.users,
                page: query.page,
                totalCount: parseInt(result?.totalCount[0].count, 10),
              });
            });
        })
      }
      onRowClick={(e, rowData) => handleLink(rowData.id)}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        exportCsv: handleExport,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay usuarios para mostrar',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Usuarios',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default TableUsers;
