import { Router } from "express";
import * as clientController from "../controllers/client.controller.js";

const router = Router();

router.post("/client", clientController.createClient);
router.get("/clients", clientController.getAllClient);
router.get("/client/:id", clientController.getClientById);
router.patch("/client/:id", clientController.updateClient);
router.delete("/client/:id", clientController.deleteclientById);

export default router