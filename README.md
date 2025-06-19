# Task Management API

A powerful REST API to manage tasks with authentication built with Node.js, Express.js, PostgreSQL, and Sequelize ORM.

## Features

- User authentication with JWT tokens
- Full CRUD operations for tasks
- User-specific task management
- PostgreSQL database with Sequelize ORM
- Input validation and data modeling
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL Server (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:
   ```sql
   CREATE DATABASE task_management;
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=task_management
   DB_USERNAME=task_user
   DB_PASSWORD=your_password
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/v1/users/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login User
- **POST** `/api/v1/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get User Profile
- **GET** `/api/v1/users/profile`
- **Headers:** `Authorization: Bearer <token>`

### Tasks

All task endpoints require authentication. Include the JWT token in the Authorization header:
`Authorization: Bearer <token>`

#### Create Task
- **POST** `/api/v1/tasks`
- **Body:**
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task management API",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-01-15T10:00:00Z",
    "tags": ["project", "api", "backend"],
    "metadata": {
      "project": "Task Management",
      "estimatedHours": 8
    }
  }
  ```

#### Get Specific Task
- **GET** `/api/v1/tasks/:id`
- Returns a specific task by ID

#### Update Task
- **PUT** `/api/v1/tasks/:id`
- **Body:** Same as create task

#### Delete Task
- **DELETE** `/api/v1/tasks/:id`

#### Get All Tasks (Admin)
- **GET** `/api/v1/tasks/all`
- Returns all tasks in the system