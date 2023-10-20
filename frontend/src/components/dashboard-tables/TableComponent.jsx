import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  TableBody,
  TablePagination,
  Chip,
  Skeleton,
  TableSortLabel,
  IconButton,
  ButtonBase,
  Collapse,
  Grid,
  Button,
} from "@mui/material";

import RowComponent from "./RowComponent";
import TableHeadComponent from "./TableHeadComponent";

const TableComponent = ({
  data = [],
  headers,
  isLoading,
  page,
  setPage,
}) => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("fecha");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array, comparator, key) => {
    const stabilizedThis = array.map((el, index) => {
      const resp = {
        ...el,
      };

      return [resp, index];
    });
    stabilizedThis.sort((a, b) => {
      const valueA = key ? a[0][key] : a[0];
      const valueB = key ? b[0][key] : b[0];

      const order = comparator(valueA, valueB);
      if (order !== 0) return order;

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeadComponent
            numSelected={selected.length}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            rowCount={data?.length}
            headers={headers}
          />
          <TableBody>
            {isLoading
              ? [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(9)].map((_, index) => (
                      <TableCell key={index} height="70px">
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : (data?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan="9" style={{ textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#266274",
                        }}
                      >
                        {`No hay datos que mostrar`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )) ||
                stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((el, index) => {
                    const cellContent = Object.values(el);
                    return (
                      <RowComponent
                        cellContent={cellContent}
                        collapsedContent={el.collapsedContent}
                        index={index}
                        key={index}
                      />
                    );
                  })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => {
          return "" + from + "-" + to + " de " + count;
        }}
      />
    </>
  );
};

export default TableComponent;
