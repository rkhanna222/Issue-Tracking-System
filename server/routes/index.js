import { application } from "express";
import userRouter from "./user-routes.js";
import authRouter from "./auth-routes.js";
import auth from "../middleware/auth.js";
import projectRouter from "../routes/project-routes.js";
import usersProjectRouter from "../routes/usersProject-routes.js"
import ticketRouter from "../routes/ticket-routes.js";
import commentRouter from "../routes/comment-routes.js";
import chartRouter from "../routes/chart-routes.js"

export default (app) => {
    console.log("check 1");
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/tickets", auth, ticketRouter);
    app.use("/api/projects", auth, projectRouter);
    app.use("/api/usersProjects", auth, usersProjectRouter);
    app.use("/api/tickets/comments", auth, commentRouter);
    app.use("/api/charts", auth, chartRouter);

}