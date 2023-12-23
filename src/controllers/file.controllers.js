import { File, Project } from "../models/index.js";
import { errorHandler, responseHandler } from "../utils/handlers.js";

export const createFile = async (req, res) => {
  try {
    const { projectId, fileName, fileDescription } = req.body;

    if (!fileName) {
      return errorHandler({
        res,
        error: "File Name is required",
        statusCode: 400,
      });
    }

    if (!projectId) {
      return errorHandler({
        res,
        error: "Project ID is required",
        statusCode: 400,
      });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return errorHandler({
        res,
        error: "Project not found",
        statusCode: 404,
      });
    }

    const newFile = await File.create({
      name: fileName,
      description: fileDescription,
    });

    project.files.push(newFile._id);

    await project.save();

    return responseHandler({
      res,
      statusCode: 201,
      message: "File Created Successfully!",
      data: {
        projectId: project._id,
        fileId: newFile._id,
        fileName: newFile.name,
        fileDescription: newFile.description,
      },
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const updateFile = async (req, res) => {
  try {
    const fileId = req.body?.fileId;
    if (!fileId) {
      return errorHandler({
        res,
        error: "File ID is required",
        statusCode: 400,
      });
    }

    const file = await File.findById(fileId);
    if (!file) {
      return errorHandler({
        res,
        error: "File not found",
        statusCode: 404,
      });
    }

    if (req.body.fileName) {
      file.name = req.body.fileName;
    }

    if (req.body.fileDescription) {
      file.description = req.body.fileDescription;
    }

    const updatedFile = await file.save();
    return responseHandler({
      res,
      message: "File Updated Successfully!",
      data: {
        fileId: updatedFile._id,
        fileName: updatedFile.name,
        fileDescription: updatedFile.description,
      },
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const fileId = req.body?.fileId;
    if (!fileId) {
      return errorHandler({
        res,
        error: "File ID is required",
        statusCode: 400,
      });
    }

    const file = await File.findById(fileId);
    if (!file) {
      return errorHandler({
        res,
        error: "File not found",
        statusCode: 404,
      });
    }

    await file.deleteOne();
    return responseHandler({
      res,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const user = req.user;
    const projectId = req.query?.projectId;

    if (!projectId) {
      return errorHandler({
        res,
        error: "Project Id is required",
        statusCode: 400,
      });
    }

    if (!user.projects.includes(projectId)) {
      return errorHandler({
        res,
        error: "Project not found for the user",
        statusCode: 404,
      });
    }

    const project = await Project.findById(projectId).populate("files");
    if (!project) {
      return errorHandler({
        res,
        error: "Project not found",
        statusCode: 404,
      });
    }

    const files = project.files.map((file) => ({
      id: file._id,
      name: file.name,
      updatedAt: file.updatedAt,
    }));

    return responseHandler({
      res,
      data: {
        projectName: project.name,
        files,
      },
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const getFileById = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!fileId) {
      return errorHandler({
        res,
        error: "File ID is required",
        statusCode: 400,
      });
    }

    const file = await File.findById(fileId);
    if (!file) {
      return errorHandler({
        res,
        error: "File not found",
        statusCode: 404,
      });
    }

    return responseHandler({
      res,
      data: {
        fileId: file._id,
        fileName: file.name,
        fileDescription: file.description,
      },
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};
