/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
const _filefy = require('filefy');

const exportFile = (columns, exportedData, fileName) => {
  new _filefy.CsvBuilder(`${fileName}.csv`)
    .setDelimeter(';')
    .setColumns(columns.map((columnDef) => columnDef.title))
    .addRows(exportedData)
    .exportFile();
};

export default exportFile;
