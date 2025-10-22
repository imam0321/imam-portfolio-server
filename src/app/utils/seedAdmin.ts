import { prisma } from "../config/db"
import { envVars } from "../config/env"
import bcryptjs from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await prisma.user.findUnique({
      where: {
        email: envVars.ADMIN.ADMIN_EMAIL
      }
    })

    if (isAdminExist) {
      console.log("Admin already exists");
      return;
    }

    const hashPassword = await bcryptjs.hash(
      envVars.ADMIN.ADMIN_PASSWORD,
      10
    );

    const adminPayload = {
      name: "Md. Imam Hossain",
      email: envVars.ADMIN.ADMIN_EMAIL,
      password: hashPassword,
    }

    await prisma.user.create({
      data: adminPayload
    })

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Failed to seed admin:", error);
  }
}
