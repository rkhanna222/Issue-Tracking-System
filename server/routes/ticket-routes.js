import express from "express";
import * as ticketController from "../controllers/ticket-controller.js";

const router = express.Router();
console.log("check 2");
router.route("/:id")
    .post(ticketController.postTicket)
    .get(ticketController.getTickets)
    .delete(ticketController.removeTicketById)
    .put(ticketController.updateTicket);

router.route("/singleTicket/:ticketId")
    .get(ticketController.getTicketById);

router.route("/")
    .get(ticketController.getAllTickets);

router.route("/assigndevs/:id/:userId/")
    .post(ticketController.assignDev);

router.route("/assignes/:id")
    .get(ticketController.getAssignees);

// router.route("/:projectId/:ticketId")
//     .get(ticketController.get)


export default router;