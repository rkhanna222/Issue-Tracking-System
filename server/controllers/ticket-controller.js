import * as ticketServices from "../services/ticket-service.js";
import * as userServices from "../services/user-service.js";
import mongoose from "mongoose";

const toDo = mongoose.Types.ObjectId;

const setErrorResponse = (error, response, status) => {
  response.status(status);
  response.json(error);
};

// @route   POST/tickets
// @desc    Create a new Ticket
// @access  private

export const postTicket = async (request, response) => {
  try {
    console.log("check 0 postTicket");
    const projectid = request.params.id;
    console.log(request.id, "77777777777");
    const user = await userServices.getUserById(request.id);

    if (!user) {
      setErrorResponse({ msg: "Cannot find the user" }, response, 404);
    }

    // console.log("check 1 postTicket",project);
    const newTicket = {
      ticketTitle: request.body.title,
      ticketDescription: request.body.description,
      timeEstimate: request.body.timeEstimate,
      ticketType: request.body.ticketType,
      priority: request.body.priority,
      ticketStatus: request.body.ticketStatus,
      ticketAuthor: request.id,
      projectId: projectid,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    console.log("check 1 postTicket");

    const ticket = await ticketServices.post(newTicket);

    console.log("check 2 postTicket");
    if (!ticket) {
      setErrorResponse({ msg: "Cannot create a new ticket" }, response, 404);
    }

    console.log("check 3 postTicket");

    response.status(200).send({
      id: ticket._id,
    });
  } catch (error) {
    console.log("check 4 postTicket");
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};

// @route   GET /Tickets/projectID
// @desc    Get ticket by project Id
// @access  private

export const getTickets = async (request, response) => {
  try {
    const projectId = request.params.id;

    const tickets = await ticketServices.getTickets(projectId);

    if (!tickets) {
      setErrorResponse({ msg: "Cannot create a new ticket" }, response, 404);
    }

    response.status(200).json(tickets);
  } catch (error) {
    setErrorResponse(error, response, 500);
  }
};

// @route   DELETE /Tickets/:ticketID
// @desc    Delete ticket by Id
// @access  private

export const removeTicketById = async (request, response) => {
  try {
    const id = request.params.id;
    console.log(id, "id");
    const ticket = await ticketServices.removeTicket(id);
    if (!ticket) {
      setErrorResponse({ msg: "ticket not found" }, response, 500);
    }
    console.log(ticket);
    response.send(ticket);
  } catch (error) {
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};

// @route   GET /Tickets/id
// @desc    Get ticket by ticket Id
// @access  private

export const getTicketById = async (request, response) => {
  try {
    const id = request.params.ticketId;

    const ticket = await ticketServices.getTicketById(id);

    if (!ticket) {
      setErrorResponse({ msg: "Ticket not found" }, response, 500);
      return;
    }

    response.status(200).json(ticket);
  } catch (error) {
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};

// @route   GET /Tickets
// @desc    Get all tickets
// @access  private

export const getAllTickets = async (request, response) => {
  try {
    const tickets = await ticketServices.getAllTickets();

    if (!tickets) {
      setErrorResponse({ msg: "Tickets not found" }, response, 404);
      return;
    }
    response.status(200).send({
      tickets: tickets,
    });
  } catch (error) {
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};

// @route   GET /Tickets/assigndevs/ticketID/UserID
// @desc    assign a dev to a ticket
// @access  private

export const assignDev = async (request, response) => {
  try {
    const ticketId = toDo(request.params.id);
    const userId = toDo(request.params.userId);

    const ticket = await ticketServices.getTicketById(ticketId);
    if (!ticket) {
      setErrorResponse({ msg: "Ticket not found" }, response, 404);
      return;
    }

    const dev = await userServices.getUserById(request.params.userId);

    if (!dev) {
      setErrorResponse({ msg: "Dev not found" }, response, 404);
      return;
    }

    const devPayload = {
      firstname: dev.firstname,
      userId: userId,
      lastname: dev.lastname,
      email: dev.email,
    };

    ticket.assignees.unshift(devPayload);

    await ticket.save();

    response
      .status(200)
      .send({ msg: "Dev assigned to the ticket successfully" });
  } catch (error) {
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};

// @route   GET /charts/
// @desc    Get chart data for ticket
// @access  private

export const getChartData = async (request, response) => {
  try {
    const countTypeIssue = await ticketServices.returnTypeCount("issue");
    const countTypeBug = await ticketServices.returnTypeCount("bug");
    const countTypeError = await ticketServices.returnTypeCount("error");
    const countTypeFeature = await ticketServices.returnTypeCount(
      "feature request"
    );
    const countTypeOther = await ticketServices.returnTypeCount("other");
    const countPriorityLow = await ticketServices.returnPriorityCount("low");
    const countPriorityMedium = await ticketServices.returnPriorityCount(
      "medium"
    );
    const countPriorityHigh = await ticketServices.returnPriorityCount("high");
    const countPriorityImmediate = await ticketServices.returnPriorityCount(
      "immediate"
    );
    const countStatusNew = await ticketServices.returnStatusCount("new");
    const countStatusOpen = await ticketServices.returnStatusCount("open");
    const countStatusInProgress = await ticketServices.returnStatusCount(
      "in progress"
    );
    const countStatusResolved = await ticketServices.returnStatusCount(
      "resolved"
    );
    const countStatusNewAdditionalInfo = await ticketServices.returnStatusCount(
      "additional info required"
    );

    response.status(200).send({
      TypeIssue: countTypeIssue,
      TypeBug: countTypeBug,
      TypeError: countTypeError,
      TypeFeature: countTypeFeature,
      TypeOther: countTypeOther,
      PriorityLow: countPriorityLow,
      PriorityMedium: countPriorityMedium,
      PriorityHigh: countPriorityHigh,
      PriorityImmediate: countPriorityImmediate,
      StatusNew: countStatusNew,
      StatusOpen: countStatusOpen,
      StatusInProgress: countStatusInProgress,
      StatusResolved: countStatusResolved,
      StatusAdditionalInfo: countStatusNewAdditionalInfo,
    });
  } catch (error) {
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};

export const getAssignees = async (request, response) => {
  try {
    const ticketId = request.params.id;

    const ticket = await ticketServices.getTicketById(ticketId);

    if (!ticket) {
      setErrorResponse({ msg: "cannot find the ticket" }, response, 500);
    }

    response.status(200).json(ticket.assignees);
  } catch (error) {}
};

export const updateTicket = async (request, response) => {
  try {
    const ticketId = request.params.id;

    const ticket = await ticketServices.getTicketById(ticketId);
    if (!ticket) {
      setErrorResponse(
        { msg: "Cannot find the ticket to update" },
        response,
        404
      );
    }

    const {
      ticketTitle,
      ticketDescription,
      timeEstimate,
      ticketType,
      priority,
      ticketStatus,
    } = request.body;
    const payload = {
      ticketTitle: ticketTitle,
      ticketDescription: ticketDescription,
      timeEstimate: timeEstimate,
      ticketType: ticketType,
      priority: priority,
      ticketStatus: ticketStatus,
    };

    const updatedTicket = await ticketServices.updateTicket(ticketId, payload); // always add await to avoid converting circular structure to JSON error

    if (!updatedTicket) {
      setErrorResponse({ msg: "Cannot update the ticket" }, response, 404);
    }

    const ticketToSend = await ticketServices.getTicketById(ticketId);

    response.status(200).send({
      msg: "Ticket updated successfully",
      ticket: ticketToSend,
    });
  } catch (error) {
    console.error(error.message);
    setErrorResponse(error, response, 500);
  }
};
