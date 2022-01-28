import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import {
  setEdit,
  setPage,
  setRowsPerPage,
  setOrder,
  setSelected,
  setOrderBy
} from "../../ui/uiSlice";

import {
  Box,
  Checkbox,
  IconButton,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import CheckIcon from "@mui/icons-material/Check";
import SickIcon from "@mui/icons-material/Sick";
import EditIcon from "@mui/icons-material/Edit";

import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";

const headCells = [
  { id: "first_name", label: "First Name", minWidth: 170, align: "right" },
  { id: "last_name", label: "Last Name", minWidth: 170, align: "left" },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right"
  },
  { id: "phone", label: "Phone", minWidth: 170, align: "left" },
  { id: "dob", label: "Birthday", align: "center" },

  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
    align: "center"
  },
  {
    id: "availability",
    label: "Available",
    minWidth: 50,
    align: "center"
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              // available={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
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
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, title, onDelete, selected, handleOpenUserModal } = props;
  const userType = useSelector((state) => state.ui.userType);
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {userType} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 1 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : numSelected === 1 ? (
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item>
            <Tooltip title="Edit user">
              <IconButton onClick={handleOpenUserModal}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete user">
              <IconButton onClick={() => onDelete(selected)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ) : (
        <Tooltip title="Add User">
          <IconButton onClick={handleOpenUserModal}>
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const User = (props) => {
  const {
    users,
    title,
    onDelete,
    handleOpenAddModal,
    handleOpenEditModal,
    handleOpenUserModal,
    onFilterList,
    handleChangeValue
  } = props;
  const dispatch = useDispatch();
  const page = useSelector((state) => state.ui.page);
  const rowsPerPage = useSelector((state) => state.ui.rowsPerPage);
  const order = useSelector((state) => state.ui.order);
  const orderBy = useSelector((state) => state.ui.orderBy);
  const selected = useSelector((state) => state.ui.selected);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch(setOrder(isAsc ? "desc" : "asc"));
    dispatch(setOrderBy(property));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      dispatch(setSelected(newSelecteds));
      return;
    }
    dispatch(setSelected([]));
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    dispatch(setSelected(newSelected));

    // Hereunder is determined wether a modal should appear as Add or as Edit

    if (newSelected.length === 1) {
      dispatch(setEdit(true));
    } else {
      dispatch(setEdit(false));
    }
  };

  function handleChangePage(event, newPage) {
    dispatch(setPage(newPage));
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(+event.target.value));
    dispatch(setPage(0));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <div>
      <Box sx={{ width: "100%", borderRadius: "10px" }}>
        <Paper sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title={title}
            onDelete={onDelete}
            selected={selected}
            onFilterList={onFilterList}
            handleOpenAddModal={handleOpenAddModal}
            handleOpenEditModal={handleOpenEditModal}
            handleOpenUserModal={handleOpenUserModal}
            handleChangeValue={handleChangeValue}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {users
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.first_name}</TableCell>
                        <TableCell align="left">{row.last_name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="left">{row.dob}</TableCell>
                        <TableCell align="center">
                          {row.gender === "male" ? (
                            <MaleIcon />
                          ) : row.gender === "female" ? (
                            <FemaleIcon />
                          ) : (
                            <TransgenderIcon />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.availability ? <CheckIcon /> : <SickIcon />}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

User.propTypes = {
  onDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default memo(User);
