import { Router } from "express";

import { userController } from "../controllers/user_controller";
import { commonMiddleware } from "../middlewares/common_middleware";
import { UserValidator } from "../validators/user_validator";

const router = Router();

router.get("/", userController.getAll);
router.post(
  "/",
  commonMiddleware.validateBody(UserValidator.create),
  userController.create,
);
router.get("/:id", userController.getById);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);

export const userRouter = router;
