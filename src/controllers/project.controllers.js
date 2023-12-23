import { Project } from "../models/index.js";
import { errorHandler, responseHandler } from "../utils/handlers.js";

export const createProject = async (req, res) => {
  try {
    const name = req.body?.name;
    if (!name) {
      return errorHandler({
        res,
        error: "Project Name is required",
        statusCode: 400,
      });
    }

    const user = req.user;

    const project = await Project.create({ name });
    user.projects.push(project._id);
    await user.save();

    return responseHandler({
      res,
      statusCode: 201,
      message: "Projected Created Successfully!",
      data: {
        projectId: project._id,
        projectName: project.name,
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

export const getAllProjects = async (req, res) => {
  try {
    const user = req.user;
    const populatedUser = await user.populate("projects");

    const projects = populatedUser.projects.map((project) => ({
      projectId: project._id,
      projectName: project.name,
    }));

    return responseHandler({
      res,
      data: projects,
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};
