import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import API from "../../utils/API";

const CreateProject = (props) => {
  const [values, setValues] = useState({
    projectTitle: "",
    projectDesc: "",
    devs: [],
  });
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);

  const handleChange = (event) => {
    let value;

    if (
      event.target.type === "select" ||
      event.target.type === "select-multiple"
    ) {
      value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
    } else {
      console.log("in single select");
      value = event.target.value;
    }
    const name = event.target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  //Method to get all users
  useEffect(() => {
    let isRendered = true;
    async function fetchUsers() {
      const users = await API.getUsers();
      if (isRendered === true) setAvailableTeamMembers(users);
    }

    fetchUsers();

    return () => {
      isRendered = false;
    };
  }, []);

  //On submit click
  async function submit(event) {
    event.preventDefault();
    try {
      let projectId = await API.createProject(values);
      async function addData() {
        values.devs.forEach(async (dev_id) => {
          await API.addProjectDevs(projectId.id, dev_id);
        });
      }
      addData();
    } catch (err) {
      console.log(err);
    }
    setValues({ projectTitle: "", projectDesc: "", devs: [] });
    props.toggle();
  }
  return (
    <Container fluid>
      <Form onSubmit={submit}>
        <Row>
          <Col>
            <FormGroup>
              <Label
                htmlFor="projectTitle"
                className="lease-form-label mandatory-entry"
              >
                Project Name
              </Label>
              <Input
                id="projectTitle"
                type="text"
                name="projectTitle"
                className="lease-form-input"
                placeholder="Enter project name"
                value={values.projectTitle}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="projectDesc">Project Description</Label>
              <Input
                type="textarea"
                name="projectDesc"
                id="projectDesc"
                placeholder="Enter description"
                value={values.projectDesc}
                onChange={handleChange}
                rows="5"
              />
            </FormGroup>
          </Col>
        </Row>
        {
          <Row>
            <Col>
              <FormGroup>
                <Label for="devs">Add Team Members</Label>
                <Input
                  type="select"
                  name="devs"
                  id="devs"
                  value={values.devs}
                  onChange={handleChange}
                  multiple
                >
                  {availableTeamMembers.map((user, key) => {
                    return (
                      <option key={key} value={user._id}>
                        {user.firstname} {user.lastname}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        }
        <Button color="default" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProject;
