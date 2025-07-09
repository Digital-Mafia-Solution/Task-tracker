const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// POST a new task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// PUT to mark task complete
router.put("/:id/complete", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    task.completed = true;
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// PUT to edit/update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid task data", error: error.message });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});

module.exports = router;
