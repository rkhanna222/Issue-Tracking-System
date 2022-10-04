import React, { useState } from "react";

import {
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import API from "../../utils/API";

const UpdateProject = (props) => {
  const [values, setValues] = useState({
    projectTitle: props.projectData.projectTitle,
    projectDesc: props.projectData.projectDesc,
  });

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
      value = event.target.value;
    }
    const name = event.target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  async function submit(event) {
    event.preventDefault();

    try {
      await API.updateProject(props.projectData._id, values);
    } catch (err) {
      console.log(err);
    }

    setValues({ projectTitle: "", projectDesc: "" });

    props.resetProjectId();
    props.toggle();
  }

  if (values) {
    console.log(values, "values");
    return (
      <Container fluid>
        <Form onSubmit={submit}>
          <Row>
            <FormGroup>
              <Label
                htmlFor="name"
                className="lease-form-label mandatory-entry"
              >
                Project Name
              </Label>
              <Input
                id="projectTitle"
                type="text"
                name="projectTitle"
                className="lease-form-input"
                placeholder="Enter Project Title"
                value={values.projectTitle}
                onChange={handleChange}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Label for="description">Project Description</Label>
              <Input
                type="textarea"
                name="projectDesc"
                id="projectDesc"
                placeholder="Enter Description"
                value={values.projectDesc}
                onChange={handleChange}
                rows="5"
              />
            </FormGroup>
          </Row>
          <Row></Row>

          <Button color="default" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  } else {
    return <span>Loading...</span>;
  }
};

export default UpdateProject;
