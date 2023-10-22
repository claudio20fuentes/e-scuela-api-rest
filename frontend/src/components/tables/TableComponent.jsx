import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  TableBody,
  TablePagination,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { capitalize } from "@utils/formatter";

import RowComponent from "./RowComponent";
import TableHeadComponent from "./TableHeadComponent";
import SearchComponent from "./SearchComponent";

const TableComponent = ({
  rows = [],
  setSelected,
  edit = false,
  isLoading,
  search = false,
  columnsOnMobile = 2,
}) => {
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("fecha");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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

  const getHeaders = (rows) => {
    let headers = [];
    try {
      const headersArray = Object.keys(rows[0]);
      headers = headersArray.map((header) => {
        return {
          value: header,
          label: capitalize(header),
        };
      });
    } catch (error) {}
    return headers;
  };

  function filterElements(arr, searchWord) {
    const lowercaseSearch = searchWord.toLowerCase();
    return arr.filter((obj) => {
      for (const key in obj) {
        if (
          typeof obj[key] === "string" &&
          obj[key].toLowerCase().includes(lowercaseSearch)
        ) {
          return true;
        }
      }
      return false;
    });
  }

  useEffect(() => {
    setFiltered(rows);
  }, [rows]);

  useEffect(() => {
    setFiltered(filterElements(rows, searchValue));
    setPage(0);
  }, [searchValue]);

  return (
    <>
      {search && <SearchComponent setSearchValue={setSearchValue} />}
      <Card style={{ width: "100%" }}>
        <CardContent
          style={{ paddingBottom: 0 }}
          sx={{ padding: mobile ? 0 : 2 }}
        >
          <TableContainer>
            <Table>
              <TableHeadComponent
                options={edit}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
                headers={getHeaders(rows)}
                columnsOnMobile={columnsOnMobile}
              />
              <TableBody>
                {isLoading
                  ? [...Array(rowsPerPage)].map((_, index) => (
                      <TableRow key={index}>
                        {[...Array(2)].map((_, index) => (
                          <TableCell key={index} height="70px">
                            <Skeleton />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : (filtered?.length === 0 && (
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
                    stableSort(filtered, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((rowContent, index) => {
                        return (
                          <RowComponent
                            index={index}
                            rowContent={rowContent}
                            edit={edit}
                            setSelected={setSelected}
                            columnsOnMobile={columnsOnMobile}
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
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas"
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + "-" + to + " de " + count;
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TableComponent;
