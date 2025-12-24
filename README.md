# Task Manager API

## Overview
This is a simple RESTful API for managing tasks, built with Node.js and Express.js using in-memory data storage.

## Features
- Create, Read, Update, and Delete (CRUD) tasks.
- Input validation and error handling.
- **Extensions**:
    - Filter tasks by completion status.
    - Sort tasks by creation date.
    - Task priority levels (low, medium, high).
    - Get tasks by priority level.

## Setup Instructions

1.  **Clone the repository** (if not already done).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the server**:
    ```bash
    node app.js
    ```
    The server will start on `http://localhost:3000`.

## API Documentation

### 1. Get All Tasks
- **Endpoint**: `GET /tasks`
- **Query Parameters**:
    - `completed` (optional): `true` or `false` to filter by status.
    - `sort` (optional): `creationDate` to sort by creation date.
- **Example**: `GET /tasks?completed=false&sort=creationDate`

### 2. Get Task by ID
- **Endpoint**: `GET /tasks/:id`
- **Example**: `GET /tasks/1`

### 3. Create Task
- **Endpoint**: `POST /tasks`
- **Body**:
    ```json
    {
        "title": "Task Title",
        "description": "Task Description",
        "completed": false,
        "priority": "medium" 
    }
    ```

### 4. Update Task
- **Endpoint**: `PUT /tasks/:id`
- **Body**:
    ```json
    {
        "title": "Updated Title",
        "description": "Updated Description",
        "completed": true,
        "priority": "high"
    }
    ```

### 5. Delete Task
- **Endpoint**: `DELETE /tasks/:id`

### 6. Get Tasks by Priority
- **Endpoint**: `GET /tasks/priority/:level`
- **Example**: `GET /tasks/priority/high`

## Testing
To run the automated tests:
```bash
npm test
```
