import { TablePagination } from '@mui/material';
import React from 'react';

interface Props {
  totalRows: number;
  rowsPerPage: number;
  page: number;
  rowsPerPageOptions: Array<{ value: number; label: string }>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TableFooter: React.FC<Props> = (props) => {
  const { totalRows, rowsPerPage, rowsPerPageOptions, page } = props;
  const { onChangePage, onChangeRowsPerPage } = props;
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component='div'
      count={totalRows}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
    />
  );
};

