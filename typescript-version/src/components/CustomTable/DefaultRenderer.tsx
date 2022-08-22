import React from 'react';
import { TableCell } from '@mui/material';

interface Props<T> {
  entry: [string, any];
  columnRenderers?: Record<string, any>;
  onRowClick?: (event: React.MouseEvent<unknown>, row: T, key: React.Key) => void;
  rowKey: React.Key;
  row: T;
}
export const DefaultRenderer = <T,>(props: Props<T>) => {
  const { entry, columnRenderers, onRowClick, row, rowKey } = props;
  const [col, value] = entry;

  return (
    <TableCell onClick={(event) => onRowClick && onRowClick(event, row, rowKey)}>
      {columnRenderers !== undefined && col in columnRenderers!
        ? columnRenderers[col](col, value, row)
        : value.toString()}
    </TableCell>
  );
};
