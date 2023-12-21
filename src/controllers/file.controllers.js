import { Project, User } from "../models/index.js";

export const createFile = async (req, res) => {
  try {
    const { projectId, fileName, fileDescription } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    const project = await Project.findById(projectId);

    const newFile = await File.create({
      name: fileName,
      description: fileDescription,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.files.push(newFile._id);

    await project.save();

    res.json({
      fileId: newFile._id,
      fileName: newFile.name,
      fileDescription: newFile.description,
      projectId: project._id,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateFile = async (req, res) => {
  try {
    const fileId = req.body.fileId;

    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (req.body.fileName) {
      file.name = req.body.fileName;
    }

    if (req.body.fileDescription) {
      file.description = req.body.fileDescription;
    }

    const updatedFile = await file.save();

    res.json({
      fileId: updatedFile._id,
      fileName: updatedFile.name,
      fileDescription: updatedFile.description,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    await file.remove();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;
    const projectId = req.query.projectId;

    if (!userId || !projectId) {
      return res
        .status(400)
        .json({ error: "User ID and Project ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.projects.includes(projectId)) {
      return res.status(404).json({ error: "Project not found for the user" });
    }

    const project = await Project.findById(projectId).populate("files");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const files = project.files.map((file) => ({
      id: file._id,
      name: file.name,
      updatedAt: file.updatedAt,
    }));

    res.json(files);
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getFileById = async (req, res) => {
  try {
    const fileId = req.query.fileId;
    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({
      fileId: file._id,
      fileName: file.name,
      fileDescription: file.description,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
