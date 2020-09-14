import React from 'react';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import tableIcons from '../../assets/icons/tableIcons';
import exportFile from '../../utils/exportCsv';

const DisplayTypes = (props) => {
  const { handleType } = props;
  const currentUser = useSelector((state) => state.userInformation);

  const handleExport = (allColumns) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/types`, {
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
        const exportedData = result?.data?.types.map((rowData) =>
          columns.map((columnDef) => rowData[columnDef.field]),
        );
        exportFile(columns, exportedData, 'types');
      });
  };

  const columns = [
    {
      title: 'Id',
      field: 'id',
      sorting: true,
    },
    {
      title: 'Nombre',
      field: 'name',
      sorting: true,
    },
    {
      title: 'Descripción',
      field: 'description',
      sorting: true,
    },
  ];

  return (
    <MaterialTable
      title="Tipos de Maquinaria"
      icons={tableIcons}
      columns={columns}
      data={(query) =>
        new Promise((resolve) => {
          const url = `${process.env.REACT_APP_API_URL}/api/v1/types?pageSize=${
            query.pageSize
          }&pageNumber=${query.page}&orderBy=${
            query.orderBy?.field
          }&orderDirection=${query.orderDirection}&search=${
            query.search
          }&filters=${JSON.stringify(query.filters)}`;
          fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser.token}`,
            },
          })
            .then((response) => response.json())
            .then((result) => {
              resolve({
                data: result?.data?.types,
                page: query.page,
                totalCount: parseInt(result?.totalCount[0].count, 10),
              });
            });
        })
      }
      style={{ width: '100%', marginTop: '2%' }}
      onRowClick={(e, rowData) => handleType(e, rowData.id)}
      options={{
        actionsColumnIndex: -1,
        sorting: true,
        exportButton: true,
        exportCsv: handleExport,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sin tipos de maquinaria encontrados',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Tipos',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default DisplayTypes;
