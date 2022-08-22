import React from 'react';
import { TableHead, TableCell, Checkbox, TableRow } from '@mui/material';

interface Props {
  enableCheck: boolean;
  numSelected?: number;
  rowCount: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  headers: string[];
}

export const TableHeader: React.FC<Props> = (props) => {
  const { enableCheck, numSelected, rowCount, onSelectAllClick, headers } = props;
  const labelId = 'enhanced-table-checkbox-header';
  return (
    <TableHead>
      <TableRow key={'header'}>
        {enableCheck && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected ? numSelected > 0 && numSelected < rowCount : undefined}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event, check) => onSelectAllClick && onSelectAllClick(event, check)}
              inputProps={{ 'aria-labelledby': labelId, 'aria-label': 'Select All', style: { width: '100%' } }}
            />
          </TableCell>
        )}
        {headers.map((header) => (
          <TableCell key={header} padding={'checkbox'}>
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
