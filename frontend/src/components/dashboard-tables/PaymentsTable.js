import { useState, useEffect } from 'react';
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
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { puppeteerDownloadPdf } from '../../utils/download';
import { PaymentPopup } from './Popup';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const formatDate = (date) => {
  if (!date) return '';
  const formatted = new Date(date).toLocaleDateString('en-GB');
  return formatted;
};

const capitalize = (word) => {
  return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
};

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator, key) {
  const stabilizedThis = array.map((el, index) => {
    const resp = {
      ...el,
      bank: el.sender?.bank || '',
      account_type: el.sender?.account_type || '',
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
}

function Status({ status, handleClickError, error }) {
  return (
    <ButtonBase onClick={() => handleClickError(error)}>
      {status === 'aceptado' ? (
        <Chip
          sx={{
            color: '#4EAF51',
            background: '#E6F3E5',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          size='small'
          label={'Aceptado'}
        />
      ) : status === 'pendiente' ? (
        <Chip
          sx={{
            color: '#F7C947',
            background: '#FEF8F2',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          size='small'
          label='Pendiente'
        />
      ) : status === 'iniciado' ? (
        <Chip
          sx={{
            color: '#03C9D7',
            background: '#EFFEFF',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          size='small'
          label='Iniciado'
        />
      ) : status === 'cancelado' ? (
        <Chip
          sx={{
            color: 'white',
            background: '#bfbfbf',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          size='small'
          label='Cancelado'
        />
      ) : (
        <Chip
          sx={{
            color: '#F54336',
            background: '#FDE4E1',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          size='small'
          label={status === 'error' ? 'Error' : 'Rechazado'}
        />
      )}
    </ButtonBase>
  );
}

function Row({ row, handleClickError, index }) {
  const [open, setOpen] = useState(false);
  const historic = row.historic || [];

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
        <TableCell>
          <Typography variant='body2' color='#555770'>
            {row.token}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body2' color='#555770'>
            {formatDate(row.date)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body2' color='#555770'>
            {row?.amount}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body2' color='#555770'>
            {row?.transferType}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body2' color='#555770'>
            {row?.sender?.bank}
          </Typography>
        </TableCell>
        <TableCell>
          <Status
            status={row.status}
            handleClickError={handleClickError}
            error={row.error}
          />
        </TableCell>
        <TableCell>
          {row.sandbox === 1 && (
            <Chip
              sx={{
                color: '#03C9D7',
                background: '#EFFEFF',
              }}
              size='small'
              label='Prueba'
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0, paddingLeft: 10 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small'>
                {historic.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan='6' style={{ textAlign: 'center' }}>
                      <Typography
                        variant='body2'
                        sx={{
                          color: '#266274',
                        }}>
                        {`No hay datos históricos de esta transacción`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{ backgroundColor: '#E9F5F4' }}
                        colSpan={7}>
                        <Typography
                          variant='body2'
                          fontWeight={700}
                          color='#555770'
                          align='left'>
                          Histórico
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant='body2'
                          fontWeight={700}
                          color='#555770'
                          align='left'>
                          Fecha
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          fontWeight={700}
                          color='#555770'
                          align='left'>
                          Hora
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          fontWeight={700}
                          color='#555770'
                          align='left'>
                          Estado
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          fontWeight={700}
                          color='#555770'
                          align='left'>
                          Código
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                    {historic.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography
                            variant='body2'
                            fontWeight={300}
                            color='#555770'
                            align='left'>
                            {item.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            fontWeight={300}
                            color='#555770'
                            align='left'>
                            {item.time}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' align='left'>
                            <Status
                              status={item.status}
                              handleClickError={handleClickError}
                              error={item.error}
                            />
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            fontWeight={300}
                            color='#555770'
                            align='left'>
                            {item.code}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              <Typography variant='subtitle1' fontWeight='500'>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//////////////// TABLE REPORT EVERYTHING UP IS FOR THE TABLE ///////////////////////////
const PaymentsTable = ({
  isLoading,
  payments,
  total,
  page,
  setPage,
  setSearch,
}) => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('fecha');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState('');
  const [caseidList, setCaseidList] = useState([]);
  const [selectedButton, setSelectedButton] = useState('todas');

  function formatRut(rut) {
    if (!rut) return '';
    rut = rut.replace(/[^\d]/g, '');
    let formattedRut = '';
    const dv = rut[rut.length - 1];
    const rutDigits = rut.slice(-7, -4) + '.' + rut.slice(-4, -1);
    const rutStart = rut.slice(0, -7);
    formattedRut = `${rutStart}.${rutDigits}-${dv}`;

    return formattedRut;
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (filter) => {
    setSelectedButton(filter);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleDownload = async (caseid) => {
    if (!caseidList.includes(caseid)) {
      puppeteerDownloadPdf(caseid, 'report');
      setCaseidList([...caseidList, caseid]);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickError = (error) => {
    setOpen(true);
    setLogs(error || 'Sin detalles que mostrar');
  };

  const headCells = [
    {
      id: '',
      numeric: false,
      disablePadding: false,
      label: '',
    },
    {
      id: 'token',
      numeric: false,
      disablePadding: false,
      label: 'ID Pago',
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Fecha',
    },
    {
      id: 'monto',
      numeric: false,
      disablePadding: false,
      label: 'Monto',
    },
    {
      id: 'transferType',
      numeric: false,
      disablePadding: false,
      label: 'Tipo',
    },
    {
      id: 'bank',
      numeric: false,
      disablePadding: false,
      label: 'Banco',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Estado',
    },
    {
      id: 'sandbox',
      numeric: false,
      disablePadding: false,
      label: '',
    },
  ];
  useEffect(() => {
    if (selectedButton === 'todas') {
      setSearch('');
      return;
    }
    setSearch(selectedButton);
    setRowsPerPage(10);
  }, [selectedButton]);

  const buttons = [
    'aceptado',
    'iniciado',
    'pendiente',
    'rechazado',
    'cancelado',
    'todas',
  ];
  return (
    <>
      <PaymentPopup open={open} handleClose={handleClose} content={logs} />
      <Card>
        <CardContent>
          <Grid container style={{ borderBottom: '1px solid #8F90A6' }}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                sx={{
                  color: selectedButton === button ? 'primary' : '#8F90A6',
                  fontWeight: selectedButton === button ? 700 : 400,
                  borderRadius: 0,
                  width: '12%',
                  borderBottom:
                    selectedButton === button ? '2px solid #00A693' : 'none',
                }}
                onClick={() => handleClick(button)}>
                {capitalize(button)}
              </Button>
            ))}
          </Grid>
          <TableContainer>
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={payments.length}
                headCells={headCells}
              />
              <TableBody>
                {isLoading
                  ? [...Array(rowsPerPage)].map((_, index) => (
                      <TableRow key={index}>
                        {[...Array(9)].map((_, index) => (
                          <TableCell key={index} height='70px'>
                            <Skeleton />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : (payments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan='9' style={{ textAlign: 'center' }}>
                          <Typography
                            variant='body2'
                            sx={{
                              color: '#266274',
                            }}>
                            {`No hay datos que mostrar`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )) ||
                    stableSort(payments, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((payment, index) => {
                        return (
                          <Row
                            row={payment}
                            index={index}
                            key={index}
                            handleClickError={handleClickError}
                          />
                        );
                      })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component='div'
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Filas por página'
            labelDisplayedRows={({ from, to, count }) => {
              return '' + from + '-' + to + ' de ' + count;
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentsTable;
