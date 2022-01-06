import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, addUser, removeUser, editUser } from "../userSlice";
import { Button, ButtonGroup, Panel, Table } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const User = ({ users, title }) => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setModalOpen(true));
  };
  const handleDelete = (e) => {
    dispatch(removeUser(e.target.id));
  };

  return (
    <div>
      {" "}
      <Panel header={<h3>{title}</h3>} bordered style={{ margin: 20 }}>
        <Table
          height={400}
          data={users}
          onRowClick={(data) => {
            console.log(data);
          }}
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
                function handleAction() {
                  alert(`id:${rowData.id}`);
                }
                return (
                  <ButtonGroup>
                    <Button
                      size="xs"
                      color="blue"
                      appearance="primary"
                      onClick={handleOpen}
                    >
                      {" "}
                      Edit{" "}
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      appearance="ghost"
                      onClick={handleDelete}
                    >
                      {" "}
                      Remove{" "}
                    </Button>
                  </ButtonGroup>
                );
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
      </Panel>
    </div>
  );
};

// User.propTypes = {
//   users: PropTypes.object.isRequired
// };

export default User;
