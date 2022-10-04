import express from "express";
import * as commentController from "../controllers/comment-controller.js";

const router = express.Router();

router.route("/:id")
    .post(commentController.createComment)
    .get(commentController.getComments);

router.route("/:ticketId/:commentId")
    .delete(commentController.removeComment);




export default router;