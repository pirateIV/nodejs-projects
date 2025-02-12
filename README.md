# Task Tracker CLI

A CLI (Command Line Interface) app that tracks your tasks and manage your to-do list.

---

## Table of Contents

- [Installation](#installation)

---

### Installation

To use the task tracker CLI. follow these steps:

1. Clone the repository

```bash
git clone https://github.com/pirateIV/nodejs-projects.git
```

2. Navigate to the directory

```bash
cd Task Tracker CLI
```

3. Dependencies

>_No dependencies used in this project._

4. Link the CLI globally (this allows you to run the `task-cli` from any where)

```bash
# Note: Run this command to link the CLI globally
npm link
```

### Uninstallation

To uninstall the CLI, run:

```bash
npm unlink -g task-cli
```

### Usage

Once set up, you can you task-cli command followed by desired action.

#### Example:
```bash
$ task-cli add "Buy groceries"
$ task-cli list
$ task-cli update 1 "Buy milk instead"
$ task-cli delete 1
$ task-cli mark-in-progress 1
$ task-cli mark-done 1
```

### Commands

Here are all the available commands:

|       Command                    |      Description                     |
|----------------------------------|--------------------------------------|
| `task-cli help`                  |  Displays all available commands     |
| `task-cli list`                  |  Lists all tasks                     |
| `task-cli add <desc>`            |  Adds  a new task  with a description|
| `task-cli update <id>`           |  Update task's description           |
| `task-cli delete <id>`           |  Deletes a task                      |
| `task-cli mark-in-progress <id>` |  Mark a task as "in-progress"        |
| `task-cli mark-done`             |  Mark a task as "done"               |

### Contributions

Contributions are welcome! if you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Commit your changes.
4. Push your branch and submit a pull request.

Please ensure your code follows the project's coding standards

### Support

If you encounter any issues or have questions, feel free to open an issue.

---

Enjoy using Task Tracker CLI 🚀