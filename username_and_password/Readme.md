# Node.js Passport Authentication

This project implements a user authentication system using Node.js, Express, Passport, and PostgreSQL with Prisma ORM. It supports user registration, login, and session management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Resources](#resources)

## Features

- User registration (sign-up) and login (sign-in)
- Session management with `express-session` and PostgreSQL store
- Secure password storage with bcrypt
- Passport local strategy for authentication
- Middleware to protect routes

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Passport**: Authentication middleware
- **Prisma ORM**: Database toolkit
- **PostgreSQL**: Relational database
- **bcrypt**: Library for hashing passwords

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- PostgreSQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MoDev40/auth-passport-js.git
   cd auth-passport-js
   ```

2. **Install dependencies:**

   ```bash
   cd username_and_password
   npm install
   ```

### Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/your-database
SESSION_SECRET=your-session-secret
```

- Replace `user`, `password`, `localhost`, `5432`, and `your-database` with your PostgreSQL credentials and database details.
- Set `SESSION_SECRET` to a random string for session security.

### Database Setup

1. **Initialize Prisma:**

   ```bash
   npx prisma init
   ```

2. **Run migrations:**

   ```bash
   npx prisma migrate dev
   ```

3. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

### Running the Application

Start the development server:

```bash
npm run start
```

The server will be running on `http://localhost:4000`.

## API Endpoints

### Authentication

- **Sign Up**
  - **POST** `/api/auth/sign-up`
  - Request Body: `{ "email": "example@example.com", "username": "username", "password": "password" }`

- **Sign In**
  - **POST** `/api/auth/sign-in`
  - Request Body: `{ "email": "example@example.com", "password": "password" }`

- **Get Current User**
  - **GET** `/api/auth/user`

- **Sign Out**
  - **POST** `/api/auth/sign-out`

## Folder Structure

- `config/`: Configuration files, including database setup.
- `controllers/`: Controllers for handling API requests.
- `routes/`: Defines the application's API routes.
- `strategy/`: Passport strategy configuration.
- `prisma/`: Prisma schema and models.
- `index.js`: Main application file.


### Session Management

For session management, you can customize the session settings in the `index.js` file, such as session duration or store.

## Resources
- [Session store](https://levelup.gitconnected.com/expressjs-postgresql-session-store-ec987146f706#70c4)
- [Tutorial](https://www.youtube.com/watch?v=_lZUq39FGv0&list=PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC&index=15)
