import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

const AddMember = (props) => {
  const { projectId } = props;
  const [dbUsers, setInitialUsers] = useState([]);
  const [selectedUsers, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      const users = await API.getUsers();

      setInitialUsers(users);
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [setUsers, projectId]);

  const handleChange = (event) => {
    let values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setUsers(values);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    selectedUsers.forEach(async (userId) => {
      await API.addProjectDevs(projectId, userId);
    });

    const userResponse = await API.getProjectUsers(projectId);

    props.setProjectTeam(userResponse);

    props.toggle();
  };

  return (
    <Container>
      <Form onSubmit={handlesubmit}>
        <FormGroup>
          <Label>Available Developers</Label>
          <Input
            type="select"
            name="availableUsers"
            value={selectedUsers}
            onChange={handleChange}
            multiple
          >
            {dbUsers.map((user, key) => {
              return (
                <option key={key} id={user._id} value={user._id}>
                  {user.firstname} {user.lastname}
                </option>
              );
            })}
          </Input>
          <Button type="submit" color="default" className="mt-5">
            Add Selected Devs to Team
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AddMember;
