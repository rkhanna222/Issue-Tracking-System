import React, { useState } from "react";
import useForm from "./useForm";
import validate from "../../utils/formValidation/ticketValidation";
import { useParams } from "react-router-dom";
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

const CreateTicket = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectId = useParams().id;

  const initialTicketValues = {
    title: "",
    description: "",
    assignees: [],
    priority: "low",
    ticketType: "issue",
    ticketStatus: "new",
    timeEstimate: 0,
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialTicketValues,
    validate
  );

  async function submit() {
    if (isSubmitting === true) return;

    console.log(props);

    setIsSubmitting(true);

    const { assignees } = values;

    let ticketId = await API.createNewTicket(projectId, values);
    console.log(ticketId, "ticket 77777777777777");

    for (let i = 0; i < assignees.length; i++) {
      const devId = { devId: assignees[i] };
      console.log(devId, ticketId.id, "devId in submit onclick");
      await API.assignDevsToTickets(ticketId.id, devId.devId);
    }

    const projectTicketsRes = await API.getTicketsByProject(projectId);

    props.setProjectTickets(projectTicketsRes);

    values.title = "";
    values.description = "";
    values.assignees = [];
    values.priority = "low";
    values.ticketType = "issue";
    values.ticketStatus = "new";
    values.timeEstimate = 0;

    props.toggle();

    setIsSubmitting(false);
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label
                htmlFor="title"
                className="lease-form-label mandatory-entry"
              >
                Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                className="lease-form-input"
                placeholder="Enter ticket title"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div style={{ fontSize: 12, color: "black" }}>
                  {errors.title}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="ticketDescription">Ticket Description</Label>
              <Input
                type="textarea"
                name="description"
                id="ticketDescription"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
                rows="5"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="assignees">Assign Devs</Label>
              <Input
                type="select"
                name="assignees"
                id="assignees"
                value={values.assignees}
                onChange={handleChange}
                multiple
              >
                {props.devs.map((dev, key) => (
                  <option id={dev._id} key={key} value={dev._id}>
                    {dev.firstname} {dev.lastname}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="timeEstimate">Time Estimate (Hours)</Label>
              <Input
                type="number"
                min="0"
                step="0.5"
                name="timeEstimate"
                id="timeEstimate"
                value={values.timeEstimate}
                onChange={handleChange}
              ></Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="select"
                name="ticketType"
                id="ticketType"
                value={values.ticketType}
                onChange={handleChange}
              >
                <option>issue</option>
                <option>bug</option>
                <option>error</option>
                <option>feature request</option>
                <option>other</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="type">Priority</Label>
              <Input
                type="select"
                name="priority"
                id="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <option>low</option>
                <option>medium</option>
                <option>high</option>
                <option>immediate</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="type">Status</Label>
              <Input
                type="select"
                name="ticketStatus"
                id="ticketStatus"
                value={values.ticketStatus}
                onChange={handleChange}
              >
                <option>new</option>
                <option>open</option>
                <option>in progress</option>
                <option>resolved</option>
                <option>additional info required</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Button color="default" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTicket;
