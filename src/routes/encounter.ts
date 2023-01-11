import express from "express";
import { encounterGetAll, encounterGetById, encounterCreate, encounterUpdate, encounterHardDelete, encounterRestore } from "../controllers/encounter";


const router = express.Router();
const encounterRouter = express.Router();

encounterRouter.get("", encounterGetAll);
encounterRouter.get("/:id", encounterGetById);

encounterRouter.post("create", encounterCreate);

encounterRouter.put("restore/:id", encounterRestore);
encounterRouter.put("update/:id", encounterUpdate);

encounterRouter.delete("delete/:id", encounterHardDelete);
router.use(encounterRouter);

export default router;
