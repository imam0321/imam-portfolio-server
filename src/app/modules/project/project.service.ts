import { Project } from "@prisma/client"
import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError"
import httpStatus from "http-status-codes"
import { Request } from "express"
import { fileUploader } from "../../helpers/fileUploader"
import { ensureUserExists } from "../../helpers/dbHelpers"

const createProject = async (userId: string, req: Request): Promise<Project> => {
  await ensureUserExists(userId)

  let uploadedImages: string[] = [];
  const files = req.files as Express.Multer.File[];
  if (files && files.length > 0) {
    const uploadResult = await Promise.all(
      files.map(file => fileUploader.uploadToCloudinary(file))
    )
    uploadedImages = uploadResult.map(result => result.secure_url)
  }

  const payload = req.body as Project;

  const projectData = {
    title: payload.title,
    description: payload.description,
    images: uploadedImages,
    features: payload.features,
    tags: payload.tags,
    category: payload.category,
    liveLink: payload.liveLink || null,
    clientRepo: payload.clientRepo || null,
    serverRepo: payload.serverRepo || null,
    userId
  }

  const newProject = await prisma.project.create({
    data: projectData
  })

  return newProject

}

const getAllProjects = async () => {
  const result = await prisma.project.findMany()
  return result
}

const getSingleProject = async (projectId: string) => {
  return await prisma.project.findFirst({
    where: {
      id: projectId
    }
  })
}

const updateProject = async (userId: string, projectId: string) => {

}

const deleteProject = async (userId: string, projectId: string) => {
  await ensureUserExists(userId)

  const project = await prisma.project.findUnique({ where: { id: projectId } })

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  if (project.images && project.images.length > 0) {
    await Promise.all(
      project.images.map((url) => fileUploader.deleteImageFroCloudinary(url))
    );
  }

  await prisma.project.delete({ where: { id: projectId } });

  return { message: "Project deleted successfully" };
}

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject
}