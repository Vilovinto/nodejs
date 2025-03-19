import { Router } from "express";

import { userRouter } from "./user_router";

const router = Router();

router.use("/users", userRouter);

export const apiRouter = router;
