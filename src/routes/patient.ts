import express from "express";
import {
  patientGetAll,
  patientGetById,
  patientCreate,
  patientUpdate,
  patientHardDelete,
} from "../controllers/patient";

const router = express.Router();
const patientRouter = express.Router();

patientRouter.get("", patientGetAll);
patientRouter.get("/:id", patientGetById);

patientRouter.post("", patientCreate);

patientRouter.put("/:id", patientUpdate);

patientRouter.delete("/:id", patientHardDelete);
router.use(patientRouter);
export default router;
