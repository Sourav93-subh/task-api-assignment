# Task API — Take-Home Assignment

## 📌 Overview

This project is a RESTful API built with **Node.js** and **Express** for managing tasks.

The goal of this assignment was to:

* Understand an unfamiliar codebase
* Write meaningful test cases
* Identify and document bugs
* Fix at least one issue
* Implement a new feature

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sourav93-subh/task-api-assignment.git
cd task-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📡 API Endpoints

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | /tasks              | Get all tasks          |
| GET    | /tasks?status=      | Filter tasks by status |
| GET    | /tasks?page=&limit= | Paginated tasks        |
| POST   | /tasks              | Create a new task      |
| PUT    | /tasks/:id          | Update a task          |
| DELETE | /tasks/:id          | Delete a task          |
| PATCH  | /tasks/:id/complete | Mark task as complete  |
| GET    | /tasks/stats        | Task statistics        |
| PATCH  | /tasks/:id/assign   | Assign task to user    |

---

## 🆕 Feature Implemented: Assign Task

### Endpoint

```
PATCH /tasks/:id/assign
```

### Request Body

```json
{
  "userId": "user123"
}
```

### Design Decisions

* Introduced a new field `assignedTo` in the task object
* Validated that `userId` is provided and is a string
* Ensured task existence before assignment

### Tradeoffs

* Reassignment is allowed for flexibility
* In stricter systems, reassignment could be restricted

### Edge Cases Handled

* Invalid task ID → returns `404`
* Missing or invalid `userId` → returns `400`

---

## 🐛 Bugs Identified

Detailed explanations are provided in `BUG_REPORT.md`.

### Summary of Issues

* Incorrect default status (`todo` instead of `pending`)
* Wrong status on completion (`done` instead of `completed`)
* Priority changes unexpectedly on completion
* Missing validation for priority values
* Tasks can be completed multiple times
* Inconsistent handling of invalid task IDs
* Server instability due to missing error handling

---

## 🔧 Bug Fix Implemented

### Fixed Issue: Default Status

* Updated default status from `"todo"` to `"pending"`
* Ensures consistency with expected API behavior

---

## 🧠 Learnings & Observations

* Writing tests early helped uncover multiple hidden issues
* Lack of validation leads to inconsistent data states
* Business logic should strictly follow API contracts
* Error handling is crucial for API reliability

---

## 🚀 Future Improvements

* Enforce strict status transitions (`pending → in-progress → completed`)
* Add schema validation (e.g., Joi or Zod)
* Prevent duplicate completion of tasks
* Improve pagination logic (offset calculation)
* Replace in-memory store with a database

---

## 👤 Author

**Sourav Subham**
GitHub: https://github.com/Sourav93-subh

