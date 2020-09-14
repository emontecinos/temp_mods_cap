import React from 'react';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import tableIcons from '../../assets/icons/tableIcons';
import exportFile from '../../utils/exportCsv';

const DisplaySubTypes = (props) => {
  const { setIdSubtype, idType } = props;
  const currentUser = useSelector((state) => state.userInformation);

  const handleExport = (allColumns) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/subtypes/type/${idType}`, {
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
        const exportedData = result?.data?.subTypes.map((rowData) =>
          columns.map((columnDef) => rowData[columnDef.field]),
        );
        exportFile(columns, exportedData, 'subtypes');
      });
  };

  const columns = [
    {
      title: 'Id',
      field: 'id',
      width: '10%',
      sorting: true,
    },
    {
      title: 'Nombre',
      field: 'name',
      width: '20%',
      sorting: true,
    },
    {
      title: 'Precio Diario',
      field: 'price',
      width: '20%',
      sorting: true,
    },
    {
      title: 'Precio Semanal',
      field: 'weekly_price',
      width: '20%',
      sorting: true,
    },
    {
      title: 'Descripción',
      field: 'description',
      sorting: true,
    },
    {
      title: '',
      field: 'edit',
      filtering: false,
      sorting: false,
      width: '7%',
      export: false,
      render: (rowData) => (
        <IconButton
          aria-label="edit"
          onClick={() => setIdSubtype(rowData.id)}
          disabled={!!rowData.blocked}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <MaterialTable
      title="Subtipos de Maquinaria"
      icons={tableIcons}
      columns={columns}
      data={(query) =>
        new Promise((resolve) => {
          const url = `${
            process.env.REACT_APP_API_URL
          }/api/v1/subtypes/type/${idType}?pageSize=${
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
                data: result?.data?.subTypes,
                page: query.page,
                totalCount: parseInt(result?.totalCount[0].count, 10),
              });
            });
        })
      }
      style={{ width: '100%' }}
      options={{
        actionsColumnIndex: -1,
        sorting: true,
        exportButton: true,
        exportCsv: handleExport,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sin subtipos de maquinaria encontrados',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Subtipos',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default DisplaySubTypes;
