import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "Patient" && params.action == "updateMany") {
    params.action = "update";
    params.args["data"] = { deletedAt: null, deleted: false };
  }
  return next(params);
});

prisma.$use(async (params, next) => {
  if (params.model == "Patient" && params.action == "delete") {
    params.action = "update";
    params.args["data"] = { deletedAt: new Date(Date.now()), deleted: true };
  }
  return next(params);
});

prisma.$use(async (params, next) => {
  if (
    (params.model == "Patient" && params.action == "findUnique") ||
    params.action === "findFirst"
  ) {
    params.action = "findFirst";
    params.args.where["deleted"] = false;
    params.args.where["deletedAt"] = null;
  }
  return next(params);
});

export async function patientGetAll(req: Request, res: Response) {
  try {
    const payload = await prisma.patient.findMany({
      where: { deleted: false },
    });
    res.status(200).json(payload);
  } catch (err) {
    if (err instanceof Error) {
      res.sendStatus(500).json({ message: err.message });
    }
  }
}

export async function patientGetById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const payload = await prisma.patient.findUnique({
      where: { patientId: Number(id) },
      include: { encounters: true },
    });
    res.status(200).json(payload);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}

export async function patientCreate(req: Request, res: Response) {
  const { firstName, middleName, lastName, birthDate } = req.body;
  const fomat = new Date(birthDate);
  try {
    const payload = await prisma.patient.create({
      data: {
        firstName,
        middleName,
        lastName,
        birthDate: fomat,
      },
    });
    res.status(201).json(payload);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}

export async function patientUpdate(req: Request, res: Response) {
  const { id } = req.params;
  const { firstName, middleName, lastName, birthDate } = req.body;
  try {
    const body = await prisma.patient.findUnique({
      where: { patientId: Number(id) },
    });
    const user = {
      firstName: firstName ?? body?.firstName,
      middleName: middleName ?? body?.middleName,
      lastName: lastName ?? body?.lastName,
      birthDate: new Date(birthDate ?? body?.birthDate),
    };
    const payload = await prisma.patient.update({
      where: {
        patientId: Number(id),
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

export async function patientRestore(req: Request, res: Response) {
  const { id } = req.params;
  try {
     await prisma.patient.updateMany({
      where: { patientId: Number(id) },
      data: {}
    });
    res.status(200).json("restore succeed");
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}

export async function patientHardDelete(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.patient.delete({
      where: { patientId: Number(id) },
    });
    res.status(200).json("delete succeed");
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message.split(".").slice(-2, -1) });
    }
  }
}
