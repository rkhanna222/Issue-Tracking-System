import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle,
  CardText,
  Button,
  List,
  Form,
  Input,
} from "reactstrap";
import moment from "moment";
import API from "utils/API";

export default function SelectedTicket({
  pickTicket,
  selectedDevs,
  comments,
  setComments,
}) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (e) => {
    let { value } = e.target;

    setComment(value);
  };

  const removeComment = async (commentId) => {
    try {
      await API.removeComment(pickTicket._id, commentId);

      const abortController = new AbortController();

      const comments = await API.getTicketComments(pickTicket._id, abortController);
      setComments(comments);
    } catch (err) {
      console.log("Error deleting comment", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await API.createComment(pickTicket._id,  comment );

      const abortController = new AbortController();

      const comments = await API.getTicketComments(pickTicket._id, abortController);
      setComments(comments);
    } catch (err) {
      console.log("Error posting comment", err);
    }

    setIsSubmitting(false);
    setComment("");
  };

  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <h3 className="mb-0">Selected Ticket Info</h3>
        </CardHeader>
        {Object.keys(pickTicket).length === 0 ? (
          <div className="m-2">No ticket selected</div>
        ) : (
          <>
            <Row className=" p-2">
              <Col xl="6" className="mt-3">
                <Card className="shadow p-4">
                  <Row className=" mb-2">
                    <Col md="3">
                      <h6 className="text-muted text-uppercase">
                        Ticket Title
                      </h6>
                      <h2 className="text-primary mb-1">
                        {pickTicket.ticketTitle}
                      </h2>
                    </Col>
                    <Col md="3">
                      <h6 className="text-muted text-uppercase">Author</h6>
                      <p color="primary" className="mb-3">
                        {pickTicket.firstname} {pickTicket.lastname}
                      </p>
                    </Col>
                    <Col md="6">
                      <h6 className="text-muted text-uppercase">Description</h6>
                      <p>{pickTicket.ticketDescription}</p>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col md="3" sm="3" xs="3">
                      <h6 className="text-muted text-uppercase">Status</h6>
                      <span className="mr-1 mb-2 badge badge-primary badge-pill">
                        {pickTicket.ticketStatus}
                      </span>
                    </Col>
                    <Col md="3" sm="3" xs="3">
                      <h6 className="text-muted text-uppercase">Priority</h6>
                      <span className="mr-1 mb-2 badge badge-primary badge-pill">
                        {pickTicket.priority}
                      </span>
                    </Col>
                    <Col md="3" sm="3" xs="3">
                      <h6 className="text-muted text-uppercase">Type</h6>
                      <span className="mr-1 mb-2 badge badge-primary badge-pill">
                        {pickTicket.ticketType}
                      </span>
                    </Col>

                    <Col md="3">
                      <h6 className="text-muted text-uppercase">
                        Time Estimate (Hours)
                      </h6>
                      <span>{pickTicket.timeEstimate || "Null"}</span>
                    </Col>
                  </Row>
                  <hr className="pt-0" />
                  <h6 className="text-muted text-uppercase">Assigned Devs </h6>
                  <List type="unstyled">
                    {selectedDevs ? (
                      selectedDevs.map((dev, index) => {
                        return (
                          <li
                            key={dev.userId}
                            id={dev.userId}
                            style={{ listStyleType: "none", padding: 0 }}
                          >
                            {`${dev.firstname} ${dev.lastname}`}
                          </li>
                        );
                      })
                    ) : (
                      <li>No devs assigned</li>
                    )}
                  </List>
                </Card>
              </Col>
              <Col xl="6" className="mt-3">
                <Card className="shadow">
                  <CardHeader className="mb-3">
                    <h4>Comments</h4>
                  </CardHeader>
                  {comments ? (
                    comments.map((comment) => {
                      return (
                        <Card body className="shadow m-1" key={comment._id}>
                          <CardTitle tag="h5">
                            <Row className="justify-content-between mx-1 mb-0">
                              <div>
                                <span id={comment.userId} className="">
                                  {comment.firstname} {comment.lastname} -{" "}
                                </span>
                                <span className="h6">
                                  {moment(comment.createdTime).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </span>{" "}
                              </div>

                              <Button
                                className="p-1 bg-none"
                                color="danger"
                                size="sm"
                                onClick={() => {
                                  removeComment(comment._id);
                                }}
                              >
                                <i className="fas fa-trash-alt"></i>
                                {/* <span>Delete</span> */}
                              </Button>
                            </Row>
                          </CardTitle>
                          <CardText className="ml-1">
                            {comment.commentText}
                          </CardText>
                        </Card>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  <Row className="m-3">
                    <Form
                      className="input-group"
                      onSubmit={handleCommentSubmit}
                    >
                      <Input
                        id="comment"
                        type="text"
                        name="comment"
                        placeholder="Enter comment"
                        value={comment}
                        onChange={handleCommentChange}
                      />
                      <div className="input-group-append">
                        <Button type="submit" color="primary">
                          Comment
                        </Button>
                      </div>
                    </Form>
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
}