import { Router } from "express";

import { authRouter } from "./auth.router";
import { userRouter } from "./user_router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export const apiRouter = router;
