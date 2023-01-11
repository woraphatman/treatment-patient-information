import express from "express";
import { encounterGetAll, encounterGetById, encounterCreate, encounterUpdate, encounterHardDelete } from "../controllers/encounter";


const router = express.Router();
const encounterRouter = express.Router();

encounterRouter.get("", encounterGetAll);
encounterRouter.get("/:id", encounterGetById);

encounterRouter.post("", encounterCreate);
encounterRouter.put("/:id", encounterUpdate);

encounterRouter.delete("/:id", encounterHardDelete);
router.use(encounterRouter);

export default router;
