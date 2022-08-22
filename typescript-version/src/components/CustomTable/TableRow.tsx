import React from 'react';
import { Checkbox, TableCell, TableRow as MaterialTableRow } from '@mui/material';
import { DefaultRenderer } from './DefaultRenderer';
interface Props<T> {
  rowKey: React.Key;
  row: T;
  enableCheck: boolean;
  columns?: string[];
  onRowClick?: (event: React.MouseEvent<unknown>, row: T, key: React.Key) => void;
  onCheckboxClick?: (isChecked: boolean, row: T, key: React.Key) => void;
  isChecked?: boolean;
  onSwitchClick?: (row: T) => void;
  columnsRenderer?: Record<string, any>;
}

export const TableRow = <T,>(props: Props<T>) => {
  const { rowKey, row, columns, enableCheck, isChecked = false, onRowClick, onCheckboxClick, columnsRenderer } = props;
  const labelId = `enhanced-table-checkbox-${rowKey}`;
  let data: Record<string, any> = row;
  if (columns != null) {
    data = columns.map((c) => ({ [c]: getFromObj(row, c) })).reduce((a, b) => ({ ...a, ...b }));
  }
  const onCheckClick = (/*event: React.MouseEvent<HTMLTableDataCellElement>*/) => {
    if (onCheckboxClick !== undefined) {
      onCheckboxClick(isChecked, row, rowKey);
    }
  };

  return (
    <MaterialTableRow
      hover
      role={enableCheck ? 'checkbox' : undefined}
      aria-checked={isChecked}
      tabIndex={-1}
      key={rowKey}
      selected={isChecked}
    >
      {enableCheck && (
        <TableCell
          padding="checkbox"
          onClick={onCheckboxClick ? onCheckClick : (event) => onRowClick && onRowClick(event, row, rowKey)}
        >
          <Checkbox checked={isChecked} inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
      )}
      {Object.entries(data).map((entry, i) => {
        return (
          <DefaultRenderer
            key={i}
            entry={entry}
            columnRenderers={columnsRenderer}
            onRowClick={onRowClick}
            rowKey={rowKey}
            row={row}
          />
        );
      })}
    </MaterialTableRow>
  );
};

function getFromObj(obj: Object, key: string): Object {
  const keys = key.toString().split('.');
  let finalObj: Object = obj;
  keys.forEach((k) => {
    finalObj = finalObj !== '' && finalObj !== null && k in finalObj ? finalObj[k as keyof typeof finalObj] : '';
  });
  return finalObj;
}
