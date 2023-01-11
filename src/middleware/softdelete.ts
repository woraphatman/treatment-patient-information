import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})
 export async function softDelete() {
  
  prisma.$use(async (params, next) => {
    if (params.model == "Patient" && params.action == "update") {
      params.action = "update";
      params.args["data"] = { deletedAt: null ,deleted: false}
    }
    return next(params);
  });
  
  prisma.$use(async (params, next) => {
   
    if (params.model == "Patient" && params.action == "delete") {
      params.action = "update";
      params.args["data"] = { deletedAt: new Date(Date.now()) ,deleted: true};
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
 
}

    
    
    