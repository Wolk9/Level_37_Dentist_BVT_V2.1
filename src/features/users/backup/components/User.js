import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setEditModalOpen } from "../../ui/uiSlice";
import {
  Button,
  ButtonGroup,
  Card,
  Table,
  Stack,
  Divider
} from "@mui/material";

const User = ({ users, title, onDelete, handleOpenAddModal, totalNumber }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.ui.userType);
  //const allClients = useSelector(clientsSelectors.selectAll);

  const handleEditModalOpen = () => {
    dispatch(setEditModalOpen(true));
  };

  return (
    <div>
      {" "}
      <Card
        header={
          <h3>
            {totalNumber} {title}
          </h3>
        }
        bordered
        style={{ margin: 20 }}
      >
        <Stack direction="column" alignItems="flex-end">
          <ButtonGroup>
            <Button onClick={handleOpenAddModal}>New User</Button>
          </ButtonGroup>
        </Stack>
        <Divider />
        <Table
          height={400}
          data={users}
          // onRowClick={(data) => {
          //   console.log(data);
          // }}
        >
          <Table.Column width={200} fixed>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.Cell dataKey="first_name" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.Cell dataKey="last_name" />
          </Table.Column>

          <Table.Column width={300}>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.Cell dataKey="email" />
          </Table.Column>
          <Table.Column width={200}>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.Cell dataKey="gender" />
          </Table.Column>

          <Table.Column width={200} fixed="right">
            <Table.HeaderCell>Action</Table.HeaderCell>

            <Table.Cell>
              {(rowData) => {
                //count++;
                //console.log(count);
                // function handleAction() {
                //   alert(`id:${rowData.id}`);
                // }
                return (
                  <Stack justifyContent="center" alignItems="center">
                    <ButtonGroup>
                      <Button
                        size="xs"
                        color="blue"
                        appearance="primary"
                        onClick={handleEditModalOpen}
                      >
                        {" "}
                        Edit{" "}
                      </Button>
                      <Button
                        size="xs"
                        color="red"
                        appearance="ghost"
                        onClick={() => onDelete(rowData.id, userType)}
                      >
                        {" "}
                        Remove{" "}
                      </Button>
                    </ButtonGroup>
                  </Stack>
                );
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
      </Card>
    </div>
  );
};

User.propTypes = {
  onDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default memo(User);
