# AI Resume Analyzer

A full-stack resume analysis platform built with React, Spring Boot, and MySQL. It allows users to upload resumes, extract key details, score ATS compatibility, and view improvement suggestions.

## Features
- User authentication with JWT
- Resume upload and PDF parsing
- ATS scoring and skill detection
- Resume history and dashboard metrics
- Protected frontend routes
- Java backend with Spring Security

## Tech Stack
- Frontend: React + Vite + Bootstrap
- Backend: Java 17 + Spring Boot 3 + Spring Security
- Database: MySQL
- Parser: Apache PDFBox

## Project Structure
- `Frontend/` – React application
- `Backend/` – Spring Boot API
- `database/` – SQL schema and startup scripts
- `docs/` – project documentation

## Local Setup

1. Create environment variables or a local `.env` file for backend secrets.
2. Start MySQL and create the database `resume_analyzer`.
3. Run the backend:
   ```bash
   cd Backend
   ./mvnw spring-boot:run
   ```
4. Run the frontend:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## Environment Variables
Use environment variables instead of committing actual secrets.

Example:
```bash
export DB_USERNAME=root
export DB_PASSWORD=your_db_password
export JWT_SECRET=replace_with_a_long_secure_secret
```

## Notes
- Do not commit real credentials or generated uploads.
- Keep the repository clean and avoid pushing build artifacts or local config files.
- Add deployment-specific environment config for production.

## License
This project is licensed under the MIT License.
