import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();
console.log("check 2");
router.route("/").post(userController.post).get(userController.getUsers);

router.route("/login").post(userController.login);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.removeUser);

//User-routes
router.route("/email/:email").get(userController.getUserByEmail);

export default router;
