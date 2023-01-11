import express from "express";
import encounterRouter from "./encounter";
import patientRouter from "./patient";

const router = express.Router();
router.use("/patient", patientRouter);
router.use("/encounter", encounterRouter);


export default router;