import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "Encounter" && params.action == "update") {
    params.action = "update";
    params.args["data"] = { deletedAt: null, deleted: false };
  }
  return next(params);
});

prisma.$use(async (params, next) => {
  if (params.model == "Encounter" && params.action == "delete") {
    params.action = "update";
    params.args["data"] = { deletedAt: new Date(Date.now()), deleted: true };
  }
  return next(params);
});

prisma.$use(async (params, next) => {
  if (
    (params.model == "Encounter" && params.action == "findUnique") ||
    params.action === "findFirst"
  ) {
    params.action = "findFirst";
    params.args.where["deleted"] = false;
    params.args.where["deletedAt"] = null;
  }
  return next(params);
});
export async function encounterGetAll(req: Request, res: Response) {
  try {
    const payload = await prisma.encounter.findMany({
      where: { deleted: false },
    });
    res.status(200).json(payload);
  } catch (err) {
    if (err instanceof Error) {
      res.sendStatus(500).json({ message: err.message });
    }
  }
}

export async function encounterGetById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const payload = await prisma.encounter.findUnique({
      where: { encounterId: Number(id) },
    });
    res.status(200).json(payload);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}

export async function encounterCreate(req: Request, res: Response) {
  const {
    visit,
    discharge,
    physicalExamination,
    historyOfIllness,
    followUp,
    patientId,
  } = req.body;
  try {
    const payload = await prisma.encounter.create({
      data: {
        visit: new Date(visit),
        discharge: new Date(discharge),
        physicalExamination: physicalExamination,
        historyOfIllness: historyOfIllness,
        followUp: new Date(followUp),
        patientId: patientId,
      },
    });
    res.status(201).json(payload);
  } catch (err) {
  
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice( -1) });
    }
  }
}

export async function encounterUpdate(req: Request, res: Response) {
  const { id } = req.params;
  const { visit, discharge, physicalExamination, historyOfIllness, followUp } =
    req.body;
  try {
    const body = await prisma.encounter.findUnique({
      where: { encounterId: Number(id) },
    });
    const user = {
      visit: new Date(visit ?? body?.visit),
      discharge: new Date(discharge ?? body?.discharge),
      physicalExamination: physicalExamination ?? body?.physicalExamination,
      historyOfIllness: historyOfIllness ?? body?.historyOfIllness,
      followUp: new Date(followUp ?? body?.followUp),
    };
    const payload = await prisma.encounter.update({
      where: {
        encounterId: Number(id),
      },
      data: { ...user },
    });
    res.status(200).json(payload);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}

export async function encounterHardDelete(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.encounter.delete({
      where: { encounterId: Number(id) },
    });
    res.status(200).json("delete succeed");
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}
