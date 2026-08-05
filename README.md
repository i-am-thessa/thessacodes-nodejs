# CRUD API POC - Node.js

A Proof of Concept (POC) demonstrating a clean and maintainable RESTful CRUD API built with **Node.js**, designed to run both as a traditional **Express** application and as a **Serverless AWS Lambda** application.

The objective of this project is not simply to implement CRUD operations, but to demonstrate **clean software architecture**, **layered design**, **configuration-driven components**, and **cloud-native deployment** using AWS.

---

# High-Level Architecture

```text
                                         Client
                                            │
                ┌───────────────────────────┼───────────────────────────┐
                │                           │                           │
                ▼                           ▼                           ▼
        Local Express                 SAM Local API             AWS Cloud API
        (npm run dev)            (sam local start-api)     (API Gateway + Lambda)
                │                           │                           │
                └───────────────────────────┼───────────────────────────┘
                                            │
                                            ▼
                                      Controllers
                                            │
                                            ▼
                                        Services
                                            │
                                            ▼
                                   Repository Factory
                              ┌─────────────┴─────────────┐
                              │                           │
                              ▼                           ▼
                     In-Memory Repository       DynamoDB Repository
                              │                           │
                              └─────────────┬─────────────┘
                                            ▼
                                       Data Storage
```

---

# Technologies

### Backend

- Node.js
- Express.js
- AWS Lambda
- AWS API Gateway

### Data Persistence

- Amazon DynamoDB
- In-Memory Repository

### Cloud & DevOps

- AWS SAM
- AWS CloudFormation
- AWS SDK v3

### Development Tools

- JavaScript (CommonJS)
- dotenv
- Nodemon
- Docker
- Postman

---

# Learning Objectives

This project demonstrates how to:

- Build a RESTful API using a layered architecture.
- Separate HTTP handling, business logic, and persistence concerns.
- Apply the Repository Pattern to abstract data access.
- Implement a Repository Factory for interchangeable persistence implementations.
- Support both local (Express) and serverless (AWS Lambda) runtimes using the same codebase.
- Deploy serverless applications using AWS SAM.

---

# Development Walkthrough

The project was intentionally built in small, testable iterations. Each phase was completed and validated before introducing the next architectural component.

> **Learning Approach**
>
> ChatGPT was used as an engineering learning and review assistant to accelerate development by validating architectural ideas, comparing implementation approaches, and reviewing clean architecture concepts. The project was intentionally developed one layer at a time to understand each component before integrating the complete solution.

| Phase | Description |
|--------|-------------|
| ✅ Environment Setup | Installed Node.js, Docker, AWS CLI, AWS SAM CLI and development tools. |
| ✅ Local Express CRUD | Built the layered project structure and implemented CRUD using an In-Memory Repository. |
| ✅ AWS Preparation | Recovered AWS account, created a `nodejs-developer` IAM user and assigned the required AWS permissions. |
| ✅ AWS Credentials | Configured AWS CLI with Access Keys and default region. |
| ✅ DynamoDB | Created the `Users` table in **ap-southeast-1**. |
| ✅ Runtime Separation | Introduced separate Express and Lambda bootstrap entry points. |
| ✅ Postman Environments | Configured a single Postman collection supporting Express, SAM Local and AWS API Gateway. |
| ✅ Repository Factory | Implemented configurable In-Memory and DynamoDB repositories. |
| ✅ AWS Deployment | Provisioned Lambda, API Gateway, IAM Roles and CloudFormation using AWS SAM. |

---

# Features

- RESTful CRUD API
- Layered Architecture
- Repository Pattern
- Repository Factory
- Express Runtime
- AWS Lambda Runtime
- DynamoDB Integration
- In-Memory Repository
- Configurable Repository Provider
- Infrastructure as Code using AWS SAM

---

# Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Layered Architecture | Separates HTTP, business logic and persistence. |
| Repository Pattern | Decouples business logic from storage implementation. |
| Repository Factory | Allows repositories to be switched through configuration. |
| Express + Lambda | Same application code runs in multiple runtimes. |
| AWS SAM | Simplifies deployment using Infrastructure as Code (IaC). |

---

# Project Structure

```text
src/
├── bootstrap/
│   ├── express.js          # Express application entry point
│   └── lambda.js           # AWS Lambda entry point
│
├── configs/                # Environment & AWS configuration
│
├── express/
│   ├── app.js              # Express application setup
│   ├── routes/             # API endpoints
│   └── middlewares/        # Express middleware
│
├── controllers/            # HTTP request / response orchestration
├── services/               # Business logic
├── repositories/
│   ├── factory.js          # Repository Factory
│   ├── in-memory/          # Local repository
│   └── dynamodb/           # DynamoDB repository
│
├── models/
├── validators/
├── utils/
└── docs/                   # Future OpenAPI / Swagger
```

---

# Environment Configuration

Create a `.env` file in the project root with the following configuration:

```properties
AWS_REGION=ap-southeast-1
REPOSITORY_PROVIDER=dynamodb
USER_TABLE=Users
PORT=3000
```

| Variable | Description |
|----------|-------------|
| `AWS_REGION` | AWS region where DynamoDB and other AWS resources are deployed. |
| `REPOSITORY_PROVIDER` | Repository implementation to use (`in-memory` or `dynamodb`). |
| `USER_TABLE` | DynamoDB table name used by the application. |
| `PORT` | Local Express server port. |


# Running the Application

The same codebase can be executed in **three different environments**.

| Environment | Command | Endpoint | Purpose |
|------------|---------|----------|---------|
| **Local Express** | `npm run dev` | `http://localhost:3000` | Fast local development and debugging |
| **Local AWS Lambda (SAM)** | `sam local start-api` | `http://127.0.0.1:3000` | Simulates Lambda + API Gateway locally using Docker |
| **AWS Cloud** | `sam deploy` | `https://<api-id>.execute-api.ap-southeast-1.amazonaws.com` | Production deployment using AWS Lambda and API Gateway |



## Local Express

```bash
npm install
npm run dev
```

Base URL

```text
http://localhost:3000
```

---

## Local AWS Lambda (SAM)

```bash
sam build
sam local start-api
```

Base URL

```text
http://127.0.0.1:3000
```

> Docker Desktop must be running before executing `sam local start-api`.

---

## AWS Cloud

Deploy using:

```bash
sam build
sam deploy
```

After deployment, SAM outputs an API Gateway endpoint similar to:

```text
https://<api-id>.execute-api.ap-southeast-1.amazonaws.com
```

---

## Postman Environment Switching

The same Postman collection is reused by changing only the `baseUrl` environment variable.

| Environment | baseUrl |
|------------|---------|
| Local Express | `http://localhost:3000` |
| Local SAM | `http://127.0.0.1:3000` |
| AWS API Gateway | `https://<api-id>.execute-api.ap-southeast-1.amazonaws.com` |

---

# Future Enhancements

### Security

- JWT Authentication
- Role-Based Access Control (RBAC)
- Request Validation
- API Rate Limiting

### Quality

- Jest Unit & Integration Tests
- ESLint & Prettier
- Centralized Error Handling

### Observability

- Structured Logging
- AWS CloudWatch
- AWS X-Ray
- Health Check Endpoint

### DevOps

- 3Musketeers Framework (Docker, Makefile, CI/CD)
- GitHub Actions CI/CD
- Multi-Environment Deployment
- Docker Development Environment

---

# Author

**ThessaCodes [NodeJS]**
**Created:** August 4, 2026 • 9:00 PM