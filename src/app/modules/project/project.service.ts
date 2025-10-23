import { Project } from "@prisma/client"
import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError"
import httpStatus from "http-status-codes"
import { Request } from "express"
import { fileUploader } from "../../helpers/fileUploader"

const createProject = async (userId: string, req: Request): Promise<Project> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found")
  }

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
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found")
  }

  return await prisma.project.delete({ where: { id: projectId } })
}

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject
}