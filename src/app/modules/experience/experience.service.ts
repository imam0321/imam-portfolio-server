import { Experience } from "@prisma/client"
import { ensureUserExists } from "../../helpers/dbHelpers"
import { prisma } from "../../config/db";


const createExperience = async (userId: string, payload: Experience) => {
  const user = await ensureUserExists(userId);

  const result = await prisma.experience.create({
    data: {
      ...payload,
      userId: user.id,
    },
  });

  return result;
};


export const ExperienceService = {
  createExperience
}