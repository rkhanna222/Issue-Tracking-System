import express from "express";
import * as ticketController from "../controllers/ticket-controller.js";

const router = express.Router();


router.route("/")
    .get(ticketController.getChartData);


export default router;