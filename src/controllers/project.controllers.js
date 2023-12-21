import { Project, User } from "../models/index.js";

export const createProject = async (req, res) => {
  try {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const user = await User.findById(userId);

    const project = await Project.create({ name });
    user.projects.push(project._id);
    await user.save();

    res.json({
      projectId: project._id,
      projectName: project.name,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;
    const user = await User.findById(userId).populate("projects");

    const projects = user.projects.map((project) => ({
      projectId: project._id,
      projectName: project.name,
    }));

    res.json(projects);
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
