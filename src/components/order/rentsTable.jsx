import React from 'react';
import MaterialTable from 'material-table';
import Moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import tableIcons from '../../assets/icons/tableIcons';
import DisplayPhase from '../display/displayPhase';

const columns = [
  {
    title: 'ID',
    field: 'id',
    sorting: false,
    width: 12,
    filtering: false,
  },
  {
    title: 'Sub-Categoría',
    field: 'subtype_name',
    sorting: true,
  },
  {
    title: 'Inicio',
    field: 'start_date',
    sorting: true,
    type: 'date',
    width: 200,
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
    sorting: true,
    type: 'date',
    width: 200,
    render: (rowData) => (
      <Typography>
        {rowData.end_date
          ? Moment.utc(rowData.end_date).format('MMM DD, YYYY')
          : 'Falta información'}
      </Typography>
    ),
  },
  {
    title: 'Fase actual',
    field: 'phase',
    filtering: false,
    sorting: false,
    export: false,
    render: (rowData) => (
      <Grid>
        <DisplayPhase rent={rowData} />
      </Grid>
    ),
  },
];

const DisplayTable = (props) => {
  const { data, type, handleClick } = props;

  return (
    <MaterialTable
      title="Arriendos"
      icons={tableIcons}
      columns={columns}
      data={data}
      options={{
        exportButton: true,
        exportAllData: true,
      }}
      style={{ width: '100%' }}
      onRowClick={(e, rowData) => handleClick(e, rowData.id)}
      localization={{
        body: {
          emptyDataSourceMessage:
            type === 'services'
              ? 'Sin servicios encontrados'
              : 'Sin arriendos encontrados',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: type === 'services' ? 'Servicios' : 'Arriendos',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default DisplayTable;
