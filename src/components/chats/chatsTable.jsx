import React from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import tableIcons from '../../assets/icons/tableIcons';

const parse = (data) => {
  data.forEach((rowData) => {
    if (rowData.message) {
      // eslint-disable-next-line no-param-reassign
      rowData.message =
        rowData.message.length >= 90
          ? `${rowData.message.substr(0, 90)}...`
          : rowData.message;
    }
    // eslint-disable-next-line no-param-reassign
    rowData.timestamp = moment(+rowData.timestamp).format('LLL');
  });
  return data;
};

const ChatsTable = (props) => {
  const { data } = props;
  const history = useHistory();

  const handleLink = (id) => {
    history.push(`/chats/${id}`);
  };

  return (
    <MaterialTable
      title="Conversaciones"
      columns={[
        {
          title: 'Usuario',
          field: 'name',
          render: (rowData) => (
            <Typography
              style={
                rowData.state === 'opened'
                  ? { fontWeight: 'normal', fontSize: 14 }
                  : { fontWeight: 'bold', fontSize: 14 }
              }
            >
              {rowData.name}
            </Typography>
          ),
        },
        {
          title: 'Asunto',
          field: 'subject',
          sorting: false,
          width: '60%',
          render: (rowData) => (
            <Typography
              style={
                rowData.state === 'opened'
                  ? { fontWeight: 'normal', fontSize: 13 }
                  : { fontWeight: 'bold', fontSize: 13 }
              }
            >
              {rowData.message}
            </Typography>
          ),
        },
        {
          title: 'Fecha y Hora',
          field: 'timestamp',
          type: 'date',
        },
      ]}
      icons={tableIcons}
      data={parse(data.reverse())}
      onRowClick={(e, rowData) => handleLink(rowData.user_id)}
      options={{
        actionsColumnIndex: -1,
        rowStyle: (rowData) => ({
          backgroundColor: rowData.state === 'opened' ? '#fafafa' : null,
        }),
        exportButton: true,
        exportAllData: true,
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

export default ChatsTable;
