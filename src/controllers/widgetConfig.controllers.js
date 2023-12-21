import { Project } from "../models/index.js";

export const updateWidgetConfig = async (req, res) => {
  try {
    const projectId = req.query.projectId;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const project = await Project.findById(projectId).populate("widgetConfig");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const widgetConfigData = req.body;

    // Update the widget configuration fields if provided in the request body
    if (widgetConfigData) {
      if (widgetConfigData.general) {
        Object.assign(project.widgetConfig.general, widgetConfigData.general);
      }

      if (widgetConfigData.display) {
        Object.assign(project.widgetConfig.display, widgetConfigData.display);
      }
    }

    const updatedProject = await project.save();
    res.json({
      projectId: updatedProject._id,
      projectName: updatedProject.name,
      widgetConfig: updatedProject.widgetConfig,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getWidgetConfigByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const project = await Project.findById(projectId).populate("widgetConfig");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      projectId: project._id,
      projectName: project.name,
      widgetConfig: project.widgetConfig,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
