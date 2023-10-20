import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableSortLabel,
  Table,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const TableHeadComponent = ({
  order,
  setOrder,
  orderBy,
  setOrderBy,
  headers,
}) => {

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      <TableCell style={{width: '5px', padding: 0}} />
        {headers.map((header) => (
          <TableCell
            key={header.id}
            sortDirection={orderBy === header.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === header.id}
              direction={orderBy === header.id ? order : "asc"}
              onClick={createSortHandler(header.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {header.label}
              </Typography>
              {orderBy === header.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;