import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, defaultValue?: string | number | boolean) {
  return process.env[name] ?? defaultValue;
}

export const DATABASE_URL = getEnv("DATABASE_URL") as string;
export const PORT = getEnv("PORT", 3000);
