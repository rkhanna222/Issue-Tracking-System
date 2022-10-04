import React, { useState, useMemo } from "react";
import useForm from "./useForm.js";
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

const UpdateTicket = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const projectId = useParams().id;

  const initialTicketValues = useMemo(() => {
    return {
      ticketTitle: props.ticketData.ticketTitle || "",
      ticketDescription: props.ticketData.ticketDescription || "",
      selectedDevs: props.selectedDevs.map((dev) => dev._id) || [],
      priority: props.ticketData.priority || "low",
      ticketType: props.ticketData.ticketType || "issue",
      ticketStatus: props.ticketData.ticketStatus || "new",
      timeEstimate: props.ticketData.timeEstimate || 0,
    };
  }, [
    props.ticketData.ticketTitle,
    props.ticketData.ticketDescription,
    props.selectedDevs,
    props.ticketData.priority,
    props.ticketData.ticketType,
    props.ticketData.ticketStatus,
    props.ticketData.timeEstimate,
  ]);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialTicketValues,
    validate
  );

  async function submit() {
    console.log("Inside Submit Button");
    if (isSubmitting === true) return;

    setIsSubmitting(true);

    const { selectedDevs } = values;
    try {
      await API.updateTicketData(props.ticketData._id, values);
      //await API.removeDevelopers(props.ticketData._id, devId.devId);

      for (let i = 0; i < selectedDevs.length; i++) {
        const devId = { devId: selectedDevs[i] };
        await API.assignDevsToTickets(props.ticketData._id, devId.devId);
      }

      const projectTicketsRes = await API.getTicketsByProject(projectId);
      props.setProjectTickets(projectTicketsRes);

      values.ticketTitle = "";
      values.ticketDescription = "";
      values.selectedDevs = [];
      values.priority = "low";
      values.ticketType = "issue";
      values.ticketStatus = "new";
      values.timeEstimate = 0;

      props.toggle();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid>
      {/* <Form onSubmit={handleSubmit}></Form> */}
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label
                htmlFor="ticketTitle"
                className="lease-form-label mandatory-entry"
              >
                Title
              </Label>
              <Input
                id="ticketTitle"
                type="text"
                name="ticketTitle"
                className="lease-form-input"
                placeholder="Enter Title"
                value={values.ticketTitle}
                onChange={handleChange}
              />
              {errors.ticketTitle && (
                <div style={{ fontSize: 12, color: "red" }}>
                  {errors.ticketTitle}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="ticketticketDescription">Description</Label>
              <Input
                type="textarea"
                name="ticketDescription"
                id="ticketDescription"
                placeholder="Enter Description"
                value={values.ticketDescription}
                onChange={handleChange}
                rows="5"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="selectedDevs">Assign Devs</Label>
              <Input
                type="select"
                name="selectedDevs"
                id="selectedDevs"
                value={values.selectedDevs}
                onChange={handleChange}
                multiple
              >
                {props.team.map((dev, key) => (
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
              <Label for="ticketType">Type</Label>
              <Input
                type="select"
                name="ticketType"
                id="ticketType"
                value={values.ticketType}
                onChange={handleChange}
              >
                <option>issue</option>
                <option>bug</option>
                <option>high</option>
                <option>error</option>
                <option>feature request</option>
                <option>other</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="ticketType">Priority</Label>
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
              <Label for="ticketType">Status</Label>
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
        <Button color="default" type="button" onClick={() => submit()}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateTicket;
