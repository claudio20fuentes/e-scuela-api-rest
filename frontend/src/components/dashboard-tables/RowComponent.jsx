import { useState } from 'react';
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RowComponent = ({ cellContent = [], collapsedContent, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {
          cellContent?.map((content, index) => (
            <TableCell key={index}>
              {content}
            </TableCell>
          ))
        }
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0, paddingLeft: 10 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              {collapsedContent}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowComponent;
