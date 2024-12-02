
# Assignment Portal API

This is a RESTful API for an **Assignment Portal** built using **Express.js**, **MongoDB**, and **JWT Authentication**. It allows users to register, log in, upload assignments, and manage their assignments. Admins can manage user roles and approve or reject assignments.

## Features

- **User Registration & Login**
- **Assignment Submission**
- **Admin Role Management**
- **JWT-based Authentication**
- **Assignment Approval/Rejection**
- **Error Handling with Custom Error Classes**
- **Database Integration with MongoDB**

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Middleware**: Custom error handling and token verification
- **Validation**: User input validation
- **Environment**: `.env` configuration file for managing sensitive data (e.g., DB URL, JWT Secret)

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** instance running locally or remotely
- **Postman** or **cURL** to test API endpoints

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Rishikashyap007/assignment-portal
cd assignment-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root of the project and add the following variables:

```
PORT=5000
DB_URL=mongodb://localhost:27017  # MongoDB URI
JWT_SECRET=your_secret_key       # JWT secret key
```

### 4. Start the server
```bash
npm start
```

The server should now be running at `http://localhost:5000`.

---

## API Endpoints

### User Routes

- **POST** `/api/users/register`: Register a new user
- **POST** `/api/users/login`: Login and receive JWT
- **POST** `/api/users/upload`: Upload an assignment (requires authentication)
- **GET** `/api/users/admin-list`: Get a list of all admin users (requires authentication)

### Admin Routes

- **POST** `/api/admin/register`: Register a new admin
- **POST** `/api/admin/login`: Login as admin and receive JWT
- **GET** `/api/admin/assignments`: View all assignments (requires admin role)
- **POST** `/api/admin/assignments/:id/accept`: Accept an assignment (requires admin role)
- **POST** `/api/admin/assignments/:id/reject`: Reject an assignment (requires admin role)

## Authentication & Authorization

The API uses **JWT (JSON Web Tokens)** for authentication. When a user logs in, they receive a token, which must be included in the `Authorization` header of subsequent requests.

### Example:
```bash
Authorization: <JWT-TOKEN>
```

For admin routes, the user must have the role `admin` to access them. The `isAdmin` middleware ensures this.

---

## Error Handling

Custom error handling is implemented using the `ApiError` class. The class formats error responses in a consistent manner.

### Example Error Response:
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "data": null,
  "success": false
}
```

---

## Models

### 1. User Model

The `User` model represents the user of the portal, including fields such as:

- `username` (required)
- `email` (required, unique)
- `password` (required, unique)
- `role` (required, either `user` or `admin`)

### 2. Assignment Model

The `Assignment` model represents a user's assignment submission, including fields such as:

- `userId` (reference to the user submitting the assignment)
- `adminId` (reference to the admin reviewing the assignment)
- `task` (description of the task)
- `status` (can be "Pending", "Accepted", or "Rejected")

---

## Middleware

### 1. `verifyToken`

This middleware verifies the JWT token provided in the request. It ensures that the user is authenticated.

### 2. `isAdmin`

This middleware ensures that the user has the `admin` role. It is used for routes that require admin privileges.

### 3. `ApiResponse`

This class is used to standardize API responses. The response contains fields such as:

- `statusCode`: HTTP status code
- `message`: A message about the result of the request
- `data`: The data returned by the API
- `success`: Boolean indicating whether the request was successful

---

## Database Connection

The app connects to MongoDB using the `mongoose` package. The database connection URI and other sensitive data are managed through the `.env` file.

---

## Deployment

To deploy this API to a platform like **Heroku**, **Render**, or **AWS**, you will need to:

1. Set up the environment variables for the respective platform (e.g., `DB_URL`, `JWT_SECRET`).
2. Ensure the platform is configured to run Node.js applications.
3. Push your code to a Git repository and connect it to the deployment platform.

---

## Testing

You can test the API using **Postman** or **cURL** by sending HTTP requests to the endpoints provided above.

### Example Test: Register a New User

```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Example Test: Log in

```bash
POST http://localhost:5000/api/users/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
```

The response will include a JWT token:

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "token": "JWT_TOKEN_HERE"
  },
  "success": true
}
```

### Example Test: View Assignments (Admin)

```bash
GET http://localhost:5000/api/admin/assignments
Authorization:  <JWT-TOKEN-HERE>
```

---


## Acknowledgements

- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database used to store user data and assignments.
- **JWT**: Authentication token used to secure the API.
- **Mongoose**: MongoDB object modeling tool for Node.js.
