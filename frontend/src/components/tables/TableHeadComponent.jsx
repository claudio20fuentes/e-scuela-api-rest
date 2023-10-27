import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableSortLabel,
  useMediaQuery,
} from "@mui/material";
import FeatherIcon from 'feather-icons-react';
import { visuallyHidden } from "@mui/utils";

const TableHeadComponent = ({
  options,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  headers,
  columnsOnMobile = 2,
}) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
        {mobile && <TableCell style={{ padding: 0 }} />}
        {headers.map((header, index) =>
          index + 1 > columnsOnMobile && mobile || header.value == 'id' ? null : (
            <TableCell
              key={header.value}
              sortDirection={orderBy === header.value ? order : false}
              sx={{
                paddingLeft: mobile ? 1 : 2,
              }}
            >
              <TableSortLabel
                active={orderBy === header.value}
                direction={orderBy === header.value ? order : "asc"}
                onClick={createSortHandler(header.value)}
              >
                <Typography variant="subtitle1" fontWeight="500">
                  {header.label}
                </Typography>
                {orderBy === header.value ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
        {
          options && (
            <TableCell align="center">
              <FeatherIcon icon="more-vertical" width="18" style={{ display: headers.length != 0 ? 'block' : 'none'}} />
            </TableCell>
          )
        }
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
