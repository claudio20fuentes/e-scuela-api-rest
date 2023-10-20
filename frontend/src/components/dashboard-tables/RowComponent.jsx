import React, { useState } from "react";
import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const RowComponent = ({ cellContent = [], collapsedContent, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell style={{ padding: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {cellContent?.map((content, index) => (
          <TableCell key={index}>{content}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{ backgroundColor: "#d3d3d3" }} pl={6}>
              <Table size="small">
                <TableBody>
                  {
                    <TableRow key={index}>
                      <TableCell style={{ width: 2 }}>
                        {Object.keys(collapsedContent)}:
                      </TableCell>
                      <TableCell>{Object.values(collapsedContent)}</TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowComponent;
