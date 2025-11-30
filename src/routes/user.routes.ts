import { Router } from "express";
import * as userController from "../controllers/user.controller.js";


const router = Router()

router.post("/users", userController.createUser)
router.get("/users", userController.getAllUser)
router.get("/user/:id", userController.getUserById)
router.patch("/user/:id", userController.updateUser)
router.delete("/user/:id", userController.deleteUserById)

export default router