import React, { useState } from "react";
import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { capitalize } from "@utils/formatter";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const RowComponent = ({ index, rowContent, edit, setSelected, columnsOnMobile }) => {
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const rowContentArray = Object.values(rowContent);
  const rowValuesArray = Object.keys(rowContent);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        {mobile && (
          <TableCell style={{ padding: 0 }}>
            <IconButton
              aria-label="expand row"
              size="small"
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {rowContentArray?.map((content, index) =>
          index + 1 > columnsOnMobile && mobile ? null : (
            <TableCell
              key={index}
              sx={{ paddingLeft: mobile ? 1 : 2, height: 70 }}
            >
              {content}
            </TableCell>
          )
        )}
        {edit && (
          <TableCell
            align="center"
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSelected(rowContentArray);
              }}
              style={{ color: '#1e4db7' }}
            >
              <EditIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {mobile && (
        <TableRow>
          <TableCell sx={{ padding: 0 }} colSpan={rowContentArray.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box style={{ backgroundColor: "#f2f6fc" }} pl={3}>
                <Table size="small">
                  <TableBody>
                    {rowContentArray?.map((content, index) =>
                      index < columnsOnMobile ? null : (
                        <TableRow key={index}>
                          <TableCell style={{ width: 2, fontWeight: 700 }}>
                            {capitalize(rowValuesArray[index])}{":"}
                          </TableCell>
                          <TableCell>{content}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default RowComponent;
