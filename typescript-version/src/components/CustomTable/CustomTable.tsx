import React from 'react';
import { TableHeader } from './TableHeader';
import { TableFooter } from './TableFooter';
import { TableRow } from './TableRow';
import { Table, TableBody, TableContainer } from '@mui/material';
// import { Loading } from '../Loading';

type IdObject<T> = T & {
  id: number | string | undefined;
};

/*
 * Defining a Props interface that besides the CommonProps,
 * it will require an array of a object T that implements an id numeric key
 * or an array of a {id: number; value: T} interface,
 * in case the object T does not implement the id key.
 */
interface CommonProps<T> {
  title: string;
  width: string;
  height: string;
  enableCheck: boolean;
  defaultRowsPerPage?: number;
  loading?: boolean;
  rowsPerPageOptions?: number[];
  columns?: string[];
  columnsMap?: Record<string, string>;
  onRowClick?: (event: React.MouseEvent<unknown>, obj: T, key: React.Key) => void;
  onCheckboxClick?: (isChecked: boolean, row: T, key: React.Key) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onSwitchClick?: (row: T) => void;
  columnsRenderer?: Record<string, any>;
}

interface NonRequiredRowIDProps<T> extends CommonProps<T> {
  rows: Array<IdObject<T>>;
  selected?: Array<IdObject<T>>;
}

type RowProps<T> = NonRequiredRowIDProps<T>;

/**
 * `CustomTable` Provides a table based on an array of objects.
 *
 * It handles pagination automatically and also allows to
 * select the objects through click.
 * Also, the header columns are infered based on the keys of the object.
 * @param props
 * @returns
 */
export const CustomTable = <T,>(props: RowProps<T>) => {
  /*
   * Component Variables
   */
  const {
    rows,
    selected,
    title,
    enableCheck,
    loading = false,
    rowsPerPageOptions = [10, 20],
    width,
    height,
    columns = [],
    columnsMap,
    onRowClick,
    onCheckboxClick,
    onSelectAllClick,
    onSwitchClick,
    columnsRenderer,
    defaultRowsPerPage = 10,
  } = props;

  /*
   * Component States
   */
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [currentRowsPerPage, setRowsPerPage] = React.useState<number>(defaultRowsPerPage);

  let rowCols = columns;
  if (rowCols.length === 0 && rows.length > 0) {
    rowCols = Object.keys(rows[0]);
  }

  let colHeader = rowCols;
  // Defining the Columns Names
  if (columnsMap != null) {
    colHeader = rowCols.map((c) => (c in columnsMap ? columnsMap[c] : c));
  }

  // Transforming the rowsPerPage into an array of object
  const labeledRowsPerPage = rowsPerPageOptions.map((opt) => ({ label: opt.toString(), value: opt }));

  const isRowSelected = <T,>(obj: IdObject<T>): boolean => {
    if (selected !== undefined) {
      // @ts-ignore Builder keeps complaining for no reason
      return selected.findIndex((rowObj) => rowObj.id === obj.id) > -1 ? true : false;
    }
    return false;
  };

  const onChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setRowsPerPage(newValue);
    setCurrentPage(0);
  };
  return (
    <>
      <TableContainer style={{ width: width, height: height }}>
        <Table aria-labelledby="tableTitle" size={'medium'} aria-label={title}>
          <TableHeader
            headers={colHeader}
            enableCheck={enableCheck}
            rowCount={rows.length}
            numSelected={selected && selected.length}
            onSelectAllClick={onSelectAllClick}
          />
          <TableBody>
            {/* <Loading spinning={loading} /> */}
            {rows
              .slice(currentPage * currentRowsPerPage, currentPage * currentRowsPerPage + currentRowsPerPage)
              .map((row) => {
                const isChecked = isRowSelected(row);
                return (
                  <TableRow<T>
                    key={row.id}
                    rowKey={row.id as string | number}
                    enableCheck={enableCheck}
                    row={row}
                    columns={rowCols}
                    isChecked={isChecked}
                    onRowClick={onRowClick}
                    onCheckboxClick={onCheckboxClick}
                    onSwitchClick={onSwitchClick}
                    columnsRenderer={columnsRenderer}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter
        totalRows={rows.length}
        rowsPerPage={currentRowsPerPage}
        rowsPerPageOptions={labeledRowsPerPage}
        page={currentPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </>
  );
};
