import React from 'react';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import tableIcons from '../../assets/icons/tableIcons';
import exportFile from '../../utils/exportCsv';

const DisplayCarriers = (props) => {
  const { handleClick } = props;
  const currentUser = useSelector((state) => state.userInformation);

  const handleExport = (allColumns) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/carriers`, {
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
        const exportedData = result?.data?.carriers.map((rowData) =>
          columns.map((columnDef) => rowData[columnDef.field]),
        );
        exportFile(columns, exportedData, 'carriers');
      });
  };

  const columns = [
    {
      title: 'Nombre',
      field: 'name',
      sorting: true,
      render: (rowData) => (
        <Typography style={!rowData.active ? { color: '#A9A9A9' } : null}>
          {rowData.name}
        </Typography>
      ),
    },
    {
      title: 'Dirección',
      field: 'address',
      filtering: false,
      sorting: true,
      render: (rowData) => (
        <Typography style={!rowData.active ? { color: '#A9A9A9' } : null}>
          {rowData.address}
        </Typography>
      ),
    },
    {
      title: 'Teléfono',
      field: 'phone',
      sorting: false,
      width: 200,
      render: (rowData) => (
        <Typography style={!rowData.active ? { color: '#A9A9A9' } : null}>
          {rowData.phone}
        </Typography>
      ),
    },
    {
      title: 'Transporte',
      field: 'carries',
      sorting: true,
      width: 200,
      render: (rowData) => (
        <Typography style={!rowData.active ? { color: '#A9A9A9' } : null}>
          {rowData.carries}
        </Typography>
      ),
    },
    {
      title: 'Email',
      field: 'email',
      sorting: true,
      render: (rowData) => (
        <Typography style={!rowData.active ? { color: '#A9A9A9' } : null}>
          {rowData.email}
        </Typography>
      ),
    },
  ];

  return (
    <MaterialTable
      title="Transportistas"
      icons={tableIcons}
      columns={columns}
      data={(query) =>
        new Promise((resolve) => {
          const url = `${
            process.env.REACT_APP_API_URL
          }/api/v1/carriers?pageSize=${query.pageSize}&pageNumber=${
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
                data: result?.data?.carriers,
                page: query.page,
                totalCount: parseInt(result?.totalCount[0].count, 10),
              });
            });
        })
      }
      style={{ width: '100%', marginTop: '2%' }}
      onRowClick={(e, rowData) => handleClick(e, rowData.id)}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        exportCsv: handleExport,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sin transportistas encontrados',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Transportistas',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default DisplayCarriers;
