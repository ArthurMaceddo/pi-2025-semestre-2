import { Router } from "express";
import * as serviceController from "../controllers/service.controller.js";

const router = Router();

router.post("/service", serviceController.createService);
router.get("/services", serviceController.getAllService);
router.get("/service/:id", serviceController.getServiceById);
router.patch("/service/:id", serviceController.updateService);
router.delete("/service/:id", serviceController.deleteServiceById);

export default router