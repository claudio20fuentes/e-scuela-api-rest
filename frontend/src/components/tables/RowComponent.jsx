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
import { capitalize } from "@utils/formatter";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FeatherIcon from "feather-icons-react";

const RowComponent = ({
  index,
  rowContent,
  optionIcon,
  setSelected,
  columnsOnMobile,
}) => {
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const rowContentArray = Object.values(rowContent);
  const rowValuesArray = Object.keys(rowContent);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        {mobile && columnsOnMobile < rowContentArray.length ? (
          <TableCell style={{ padding: 0, borderBottom: 0 }}>
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : (
          <TableCell style={{ borderBottom: 0 }} />
        )}
        {rowContentArray?.map((content, index) =>
          (index + 1 > columnsOnMobile && mobile) ||
          rowValuesArray[index] == "id" ? null : (
            <TableCell
              key={index}
              sx={{
                paddingLeft: mobile ? 1 : 2,
                height: 70,
                borderBottom: mobile ? 0 : "1px solid #e0e0e0",
              }}
            >
              {content}
            </TableCell>
          )
        )}
        {optionIcon && (
          <TableCell
            align="center"
            style={{
              width: "2px",
              padding: 0,
              borderBottom: mobile ? 0 : "1px solid #e0e0e0",
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSelected(rowContentArray);
              }}
              style={{ color: "#1e4db7" }}
            >
              <FeatherIcon icon={optionIcon} />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {mobile && (
        <TableRow>
          <TableCell sx={{ padding: 0 }} colSpan={rowContentArray.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box style={{ backgroundColor: "#f2f6fc" }}>
                <Table size="small">
                  <TableBody>
                    {rowContentArray?.map((content, index) =>
                      index < columnsOnMobile ? null : (
                        <TableRow key={index}>
                          <TableCell
                            style={{
                              width: "45%",
                              fontWeight: 700,
                              borderBottom: 0,
                            }}
                          >
                            {capitalize(rowValuesArray[index])}
                            {":"}
                          </TableCell>
                          <TableCell style={{ borderBottom: 0 }}>
                            {content}
                          </TableCell>
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
