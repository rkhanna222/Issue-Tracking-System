import express from "express";
import * as projectController from "../controllers/project-controller.js";

const router = express.Router();
console.log("check 2");
router
  .route("/")
  .post(projectController.postProject)
  .get(projectController.getAllProject);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .delete(projectController.removeProjectById)
  .put(projectController.updateProject);

// router.route("/tickets/:id")
//     .post(projectController.postTicket);
// .get(projectController.getAllTickets)

export default router;
