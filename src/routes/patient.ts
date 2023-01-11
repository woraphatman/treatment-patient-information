import express from "express";
import {
  patientGetAll,
  patientGetById,
  patientCreate,
  patientUpdate,
  patientHardDelete,
  patientRestore
} from "../controllers/patient";

const router = express.Router();
const patientRouter = express.Router();

patientRouter.get("", patientGetAll);
patientRouter.get("/:id", patientGetById);

patientRouter.post("create", patientCreate);

patientRouter.put("restore/:id", patientRestore);
patientRouter.put("update/:id", patientUpdate);

patientRouter.delete("delete/:id", patientHardDelete);
router.use(patientRouter);
export default router;
