import express from "express";
import * as usersProjectController from "../controllers/usersProject-controller.js";

const router = express.Router();

console.log("in users project router check ");

router.route("/:project/:user")
    .get(usersProjectController.addUserToProject)
    .delete(usersProjectController.removeUserFromProject);


router.route("/")
    .get(usersProjectController.getUsersProject);

router.route("/:project")
    .get(usersProjectController.getProjectUsers);



export default router;