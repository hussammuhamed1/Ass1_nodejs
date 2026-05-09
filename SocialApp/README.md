# Social Media Application

A feature-rich backend API for a social media platform built with Node.js, Express, and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Modules](#api-modules)
- [Middleware](#middleware)
- [Utilities](#utilities)
- [Database](#database)
- [Security](#security)
- [Development](#development)

## 📝 Overview

This is a comprehensive social media backend application that provides RESTful APIs for user authentication, user management, and social interactions. The application is built with TypeScript for type safety and includes modern security practices.

## ✨ Features

- **User Authentication**: JWT-based authentication system with secure password hashing using bcrypt
- **User Management**: Complete user CRUD operations and profile management
- **Authorization**: Role-based access control middleware
- **Data Validation**: Input validation using Zod schema validation
- **Email Services**: Automated email notifications with HTML templates
- **Security**: 
  - Password encryption and hashing
  - JWT token management
  - Secure data encryption
- **Caching**: Redis integration for performance optimization
- **Error Handling**: Centralized error handling and response management
- **Event System**: Built-in event handling for asynchronous operations

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Caching**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Encryption**: CryptoJS
- **Email**: Nodemailer
- **Validation**: Zod

## 📁 Project Structure

```
src/
├── bootstrap.ts              # Application initialization and setup
├── index.ts                  # Application entry point
├── DB/                       # Database configuration
│   ├── config/
│   │   └── connection.ts     # Database connection setup
│   ├── model/
│   │   └── userModel.ts      # User schema definition
│   └── repo.ts               # Database repositories
├── Enums/
│   └── enums.ts              # Application enums
├── env/
│   └── config.ts             # Environment variables configuration
├── middlewares/              # Express middleware
│   ├── authentication.middleware.ts   # JWT authentication
│   ├── authorization.middleware.ts    # Role-based access control
│   └── validation.middleware.ts       # Input validation
├── modules/                  # Application modules (business logic)
│   ├── authModule/           # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.types.ts
│   └── userModule/           # User management module
│       ├── user.controller.ts
│       ├── user.service.ts
│       └── user.types.ts
└── utils/                    # Utility functions
    ├── email/                # Email service
    │   ├── sendEmail.ts
    │   ├── genrateHTML.ts
    │   └── emailEvent.ts
    ├── Events/               # Event handling system
    │   └── EventHandler.ts
    ├── res/                  # Response handlers
    │   ├── error.handle.ts
    │   └── sucess.handle.ts
    ├── security/             # Security utilities
    │   ├── encryption.ts
    │   ├── hashing.ts
    │   └── token.ts
    └── types/                # TypeScript type definitions
        ├── db.type.ts
        └── res.type.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB running locally or connection string to remote instance
- Redis running locally or connection string to remote instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HamzaOmarSaad/social-media-application.git
   cd social-media-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.dev` file in the `config/` directory
   - Configure the following variables:

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/social-app

   # Redis
   REDIS_URL=redis://localhost:6379

   # JWT
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d

   # Email Service
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password

   # Encryption
   ENCRYPTION_KEY=your_encryption_key_here
   ```

## ⚙️ Configuration

### Environment Configuration

The application uses environment-based configuration files located in the `config/` directory:

- `.env.dev` - Development environment variables
- `.env.prod` - Production environment variables (create as needed)

Configuration is loaded via `src/env/config.ts`.

### Database Configuration

Configure MongoDB connection in `src/DB/config/connection.ts`.

### Redis Configuration

Redis is used for caching and session management. Update the Redis URL in your environment variables.

## 🎯 Running the Application

### Development Mode with Watch

Run the TypeScript compiler in watch mode to automatically rebuild on file changes:

```bash
npm run start:build
```

In a separate terminal, run the application:

```bash
npm run start:dev
```

This will start the Node.js application with the `--watch` flag for automatic restart on file changes.

### Build for Production

Compile TypeScript to JavaScript:

```bash
npx tsc
```

Start the production application:

```bash
node ./dist/index.js
```

## 📦 API Modules

### Authentication Module (`authModule/`)

Handles user registration, login, and authentication flows.

- **Routes**: `/api/auth/*`
- **Controller**: `auth.controller.ts`
- **Service**: `auth.service.ts`
- **Types**: `auth.types.ts`

**Features:**
- User registration with validation
- User login with JWT token generation
- Token refresh
- Logout functionality

### User Module (`userModule/`)

Manages user profiles and user-related operations.

- **Routes**: `/api/users/*`
- **Controller**: `user.controller.ts`
- **Service**: `user.service.ts`
- **Types**: `user.types.ts`

**Features:**
- Get user profile
- Update user information
- Delete user account
- Get user list

## 🛡️ Middleware

### Authentication Middleware
Verifies JWT tokens and ensures user is authenticated before accessing protected routes.

**File**: `src/middlewares/authentication.middleware.ts`

### Authorization Middleware
Enforces role-based access control to restrict access based on user roles.

**File**: `src/middlewares/authorization.middleware.ts`

### Validation Middleware
Validates request data using Zod schemas before processing.

**File**: `src/middlewares/validation.middleware.ts`

## 🔧 Utilities

### Email Service
Sends automated emails with HTML templates.

- `sendEmail.ts` - Main email sending function
- `emailEvent.ts` - Email event handlers
- `genrateHTML.ts` - HTML template generation

### Security Utilities

- **Encryption**: `src/utils/security/encryption.ts` - Data encryption/decryption
- **Hashing**: `src/utils/security/hashing.ts` - Password and data hashing
- **Token**: `src/utils/security/token.ts` - JWT token operations

### Response Handlers

- **Success Handler**: `src/utils/res/sucess.handle.ts` - Standardized success response format
- **Error Handler**: `src/utils/res/error.handle.ts` - Centralized error handling

### Event System

- **EventHandler**: `src/utils/Events/EventHandler.ts` - Event emitter for async operations

## 🗄️ Database

### MongoDB & Mongoose

The application uses Mongoose for MongoDB object modeling.

**User Model**: `src/DB/model/userModel.ts`

**Repository Pattern**: `src/DB/repo.ts` - Centralized data access layer

**Connection**: `src/DB/config/connection.ts` - Database connection management

### Database Types

Type definitions for database operations are located in `src/utils/types/db.type.ts`.

## 🔐 Security

### Security Features

1. **Password Hashing**: Bcrypt for secure password storage
2. **JWT Tokens**: Stateless authentication with token-based sessions
3. **Data Encryption**: CryptoJS for sensitive data encryption
4. **Input Validation**: Zod schema validation to prevent malicious input
5. **Middleware Protection**: Authentication and authorization checks on all protected routes

### Security Best Practices

- Store sensitive data in environment variables
- Use strong JWT secrets (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Implement rate limiting on authentication endpoints
- Use HTTPS in production
- Regularly update dependencies

## 📊 Development

### Project Information

- **Name**: social-media-application
- **Version**: 1.0.0
- **License**: ISC
- **GitHub**: https://github.com/HamzaOmarSaad/social-media-application

### Available Scripts

```bash
# Run TypeScript compiler in watch mode
npm run start:build

# Start development server with file watching
npm run start:dev

# Run tests
npm test
```

### Type Checking

The project uses strict TypeScript configuration:
- No unchecked indexed access
- Exact optional property types
- No implicit returns or overrides
- Detects unused locals

## 📋 Enums

Application-wide enums are defined in `src/Enums/enums.ts`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.





**Happy Coding!** 🚀
