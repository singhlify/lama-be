import { Project, WidgetConfig } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";
import { errorHandler, responseHandler } from "../utils/handlers.js";

export const updateWidgetConfig = async (req, res) => {
  try {
    const projectId = req.body.projectId;
    if (!projectId) {
      return errorHandler({
        res,
        error: "Project ID is required",
        statusCode: 400,
      });
    }

    let project = await Project.findById(projectId).populate("widgetConfig");
    if (!project) {
      return errorHandler({
        res,
        error: "Project not found",
        statusCode: 404,
      });
    }

    const widgetConfigData = req.body?.widgetConfigData;

    if (!project.widgetConfig) {
      const newWidgetConfig = new WidgetConfig();
      if (widgetConfigData) {
        if (widgetConfigData.general) {
          Object.assign(newWidgetConfig.general, widgetConfigData.general);
        }

        if (widgetConfigData.display) {
          Object.assign(newWidgetConfig.display, widgetConfigData.display);
        }
      }
      const savedWidgetConfig = await newWidgetConfig.save();
      project.widgetConfig = savedWidgetConfig._id;
    } else {
      const actualWidgetConfig = await WidgetConfig.findById(
        project.widgetConfig
      );
      if (widgetConfigData) {
        if (widgetConfigData.general) {
          Object.assign(actualWidgetConfig.general, widgetConfigData.general);
        }

        if (widgetConfigData.display) {
          Object.assign(actualWidgetConfig.display, widgetConfigData.display);
        }
      }
      await actualWidgetConfig.save();
    }

    const updatedProject = await project.save();
    return responseHandler({
      res,
      data: {
        projectId: updatedProject._id,
        projectName: updatedProject.name,
        widgetConfig: updatedProject.widgetConfig,
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

export const uploadBotIcon = async (req, res) => {
  try {
    const projectId = req.body?.projectId;
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

    if (!project.widgetConfig) {
      const newWidgetConfig = new WidgetConfig();
      const savedWidgetConfig = await newWidgetConfig.save();
      project.widgetConfig = savedWidgetConfig._id;
      await project.save();
    }

    const widgetConfig = await WidgetConfig.findById(project.widgetConfig);
    if (!widgetConfig) {
      return errorHandler({
        res,
        error: "Widget config not found",
        statusCode: 404,
      });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (error) {
        console.log("error>>>", error);
        return errorHandler({
          res,
          error,
          statusCode: 500,
        });
      }

      widgetConfig.display.chatIconProp.botIcon = result.secure_url;
      const savedWidgetConfig = await widgetConfig.save();

      return responseHandler({
        res,
        message: "Uploaded!",
        data: savedWidgetConfig,
      });
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const getWidgetConfigByProjectId = async (req, res) => {
  try {
    const projectId = req.query?.projectId;
    if (!projectId) {
      return errorHandler({
        res,
        error: "Project ID is required",
        statusCode: 400,
      });
    }

    const project = await Project.findById(projectId).populate("widgetConfig");
    if (!project) {
      return errorHandler({
        res,
        error: "Project not found",
        statusCode: 404,
      });
    }

    return responseHandler({
      res,
      data: {
        projectId: project._id,
        projectName: project.name,
        widgetConfig: project.widgetConfig,
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
