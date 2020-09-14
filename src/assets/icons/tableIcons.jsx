import React, { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';

const TableIcons = {
  DetailPanel: forwardRef(() => <ChevronRight />),
  Filter: forwardRef(() => <FilterList />),
  FirstPage: forwardRef(() => <FirstPage />),
  LastPage: forwardRef(() => <LastPage />),
  NextPage: forwardRef(() => <ChevronRight />),
  PreviousPage: forwardRef(() => <ChevronLeft />),
  ResetSearch: forwardRef(() => <Clear />),
  Search: forwardRef(() => <Search />),
  SortArrow: forwardRef(() => <ArrowDownward />),
  Export: forwardRef(() => <SaveAlt />),
};

export default TableIcons;
