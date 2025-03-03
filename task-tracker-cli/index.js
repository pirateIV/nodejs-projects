#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { argv } from "node:process";
import { fileURLToPath } from "node:url";
import { commandLogs, dateTimeFormat } from "./helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the tasks JSON file
const TASKS_PATH = path.join(__dirname, "tasks.json");

let tasks = loadTasks();

// Write tasks to file, or create a new one if unavailable
function saveTasks(tasks) {
  return fs.writeFileSync(TASKS_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

// Get tasks from JSON file, if it exists
function loadTasks() {
  try {
    const task = fs.readFileSync(TASKS_PATH, "utf-8");
    return JSON.parse(task);
  } catch (error) {
    return [];
  }
}

// Helper to check if task exists
function findTask(id) {
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    console.log("Task not found!");
  }
  return task;
}

// Helper to update and save tasks
function updateTask(id, payload) {
  let taskId = Number(id);
  const updatedTask = getUpdatedTask(taskId, payload);
  if (!updatedTask) return;

  console.log(updatedTask);
  tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
  saveTasks(tasks);
}

// Helper to get updated task
function getUpdatedTask(id, payload) {
  if (!isValidId(id)) return;

  const task = findTask(id);
  if (!task) return;

  return {
    ...task,
    ...payload,
    updatedAt: dateTimeFormat(),
  };
}

// Helper for Default format for a new task
function getNewTask(description) {
  const time = dateTimeFormat();
  const id =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

  return {
    id,
    description,
    status: "todo",
    createdAt: time,
    updatedAt: time,
  };
}

// Check if the id is a number
function isValidId(id) {
  if (isNaN(Number(id))) {
    console.log("Invalid id, id must be a number.");
    return false;
  }
  return true;
}

// List of all available commands
const commands = {
  list() {
    if (tasks.length === 0) {
      console.log("No tasks found!");
      return;
    }
    console.table(tasks);
  },
  add(desc) {
    if (!desc) {
      console.log("Task description not found!");
      return;
    }
    const newTask = getNewTask(desc);
    console.log(newTask);

    tasks.push(newTask);
    saveTasks(tasks);
  },
  update(id, description) {
    if (!description) {
      console.log("Did not update todo, data not found!");
      return;
    }
    console.log(`Todo ID: ${id} updated`);

    updateTask(id, { description });
  },
  delete(id) {
    if (!isValidId(id)) return;
    console.log(`Todo ID: ${id} deleted`);

    tasks = tasks.filter((task) => task.id !== Number(id));
    saveTasks(tasks);
  },
  "mark-in-progress"(id) {
    console.log(`Todo ID: ${id} marked as "in-progress"`);

    updateTask(id, { status: "in-progress" });
  },
  "mark-done"(id) {
    console.log(`Todo ID: ${id} marked as "done"`);

    updateTask(id, { status: "done" });
  },
  help() {
    console.log("Available commands:\n");
    commandLogs.forEach((cmd) => {
      console.log(`${cmd.command.padEnd(40)} ${cmd.description}`);
    });
  },
};

// Get command and arguments from the command line
const [command, ...args] = argv.slice(2);

// Execute the commands if it exists, otherwise show help
if (command in commands) {
  commands[command](...args);
} else {
  commands.help();
}
