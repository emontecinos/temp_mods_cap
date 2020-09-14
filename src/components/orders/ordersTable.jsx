import React from 'react';
import MaterialTable from 'material-table';
import Moment from 'moment';

import { Typography } from '@material-ui/core';
import tableIcons from '../../assets/icons/tableIcons';

const columns = [
  {
    title: 'N° Pedido',
    field: 'group_id',
    width: '12%',
  },
  {
    title: 'Arrendatario',
    field: 'name',
  },
  {
    title: 'Inicio',
    field: 'start_date',
    render: (rowData) => (
      <Typography>
        {rowData.start_date
          ? Moment.utc(rowData.start_date).format('MMM DD, YYYY')
          : 'Falta información'}
      </Typography>
    ),
  },
  {
    title: 'Término',
    field: 'end_date',
    render: (rowData) => (
      <Typography>
        {rowData.end_date
          ? Moment.utc(rowData.end_date).format('MMM DD, YYYY')
          : 'Falta información'}
      </Typography>
    ),
  },
];

const DisplayTable = (props) => {
  const { orders, handleOrder } = props;

  return (
    <MaterialTable
      title="Pedidos"
      icons={tableIcons}
      columns={columns}
      data={orders}
      style={{ width: '100%' }}
      onRowClick={(e, rowData) => handleOrder(e, rowData.group_id)}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sin pedidos encontrados',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Pedidos',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
      options={{
        sorting: true,
        exportButton: true,
        exportAllData: true,
      }}
    />
  );
};

export default DisplayTable;
