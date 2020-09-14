import React from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Typography } from '@material-ui/core';

import tableIcons from '../../assets/icons/tableIcons';

const TableMachines = (props) => {
  const { data } = props;
  const history = useHistory();

  const handleLink = (id) => {
    history.push(`/machines/${id}`);
  };

  const handleFiltering = (displayList, target) => {
    const lookup = Object();
    if (displayList.length > 0) {
      displayList.forEach((x) => {
        lookup[x[target]] = x[target];
      });
    }
    return lookup;
  };

  return (
    <MaterialTable
      title="Maquinarias"
      columns={[
        {
          title: 'ID',
          field: 'id',
          width: '10%',
          filtering: false,
        },
        {
          title: 'Año',
          field: 'year',
          width: '10%',
          lookup: handleFiltering(data, 'year'),
        },
        {
          title: 'Precio',
          field: 'price',
          width: '10%',
          filtering: false,
        },
        {
          title: 'Marca',
          field: 'brand_name',
          lookup: handleFiltering(data, 'brand_name'),
        },
        {
          title: 'Modelo',
          field: 'model_name',
          width: '10%',
          lookup: handleFiltering(data, 'model_name'),
        },
        {
          title: 'Categoría',
          field: 'type_name',
          lookup: handleFiltering(data, 'type_name'),
        },
        {
          title: 'Subcategoría',
          field: 'subtype_name',
          lookup: handleFiltering(data, 'subtype_name'),
        },
        {
          title: 'Archivada',
          field: 'archived',
          filtering: false,
          export: false,
          render: (rowData) => (
            <Typography
              style={
                rowData.archived
                  ? { fontWeight: 'normal', fontSize: 13 }
                  : { fontWeight: 'bold', fontSize: 13 }
              }
            >
              {rowData.archived ? 'Deshabilitada' : 'Habilitada'}
            </Typography>
          ),
        },
      ]}
      icons={tableIcons}
      data={data}
      onRowClick={(e, rowData) => handleLink(rowData.id)}
      options={{
        sorting: true,
        filtering: true,
        actionsColumnIndex: -1,
        rowStyle: (rowData) => ({
          backgroundColor: !rowData.available ? '#fafafa' : null,
        }),
        exportButton: true,
        exportAllData: true,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay máquinas para mostrar',
        },
        toolbar: { searchPlaceholder: 'Buscar' },
        pagination: {
          labelRowsSelect: 'Máquinas',
          labelDisplayedRows: ' {from}-{to} de {count}',
        },
      }}
    />
  );
};

export default TableMachines;
