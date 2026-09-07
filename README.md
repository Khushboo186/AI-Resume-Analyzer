# 🚀 AI Resume Analyzer

> A full-stack resume analysis platform designed to help students and job seekers evaluate, understand, and improve their resumes for internship and job applications.

**AI Resume Analyzer** allows users to securely upload their resumes, extract relevant information, evaluate ATS compatibility, identify skills, and receive actionable suggestions for improving their resumes.

🔗 **Live Demo:** *Coming Soon*
💻 **GitHub:** https://github.com/Khushboo186/AI-Resume-Analyzer

---

## 📌 Problem Statement

Creating a resume is an important part of the internship and placement process, but many students are unsure whether their resume is:

* ATS-friendly
* Relevant to their target role
* Using appropriate technical skills and keywords
* Well-structured and readable
* Strong enough for internship applications

The goal of this project is to provide students with a simple platform where they can upload their resume and receive useful, data-driven feedback instead of manually checking their resume against different requirements.

---

## 🎯 Project Objectives

The application is designed to:

* Analyze uploaded resumes automatically
* Extract important information from resumes
* Evaluate ATS compatibility
* Detect technical skills and keywords
* Identify areas that can be improved
* Maintain resume analysis history
* Provide a centralized dashboard for users

The project is also being developed with a focus on **role-specific analysis and AI-powered recommendations**.

---

## ✨ Key Features

### 🔐 Secure Authentication

* User registration and login
* JWT-based authentication
* BCrypt password hashing
* Protected API endpoints
* Protected frontend routes

### 📄 Resume Management

* Resume upload
* PDF resume parsing
* Resume information extraction
* Resume history
* Resume deletion
* User-specific resume access

### 📊 ATS Analysis

The application evaluates resumes using multiple factors, including:

* Contact information
* Resume sections
* Technical skills
* Keywords
* Action verbs
* Quantifiable achievements
* Resume length and structure

The result is presented as an overall ATS compatibility score.

### 🧠 Skill Detection

The system identifies technical skills mentioned in the resume and helps users understand the skills present in their profile.

### 💡 Resume Improvement

The application provides suggestions to help users improve:

* Resume structure
* Skills section
* Project descriptions
* Achievements
* Keywords
* Overall resume quality

### 📈 Dashboard

Users can view:

* Resume statistics
* ATS scores
* Uploaded resumes
* Analysis history
* Detected skills
* Improvement information

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Bootstrap
* JavaScript
* Axios
* React Router

### Backend

* Java 17
* Spring Boot 3
* Spring Security
* JWT
* REST APIs
* Maven

### Database

* MySQL
* Spring Data JPA / Hibernate

### Resume Processing

* Apache PDFBox

### Development Tools

* Visual Studio Code
* IntelliJ IDEA / Eclipse
* MySQL Workbench
* Postman
* Git
* GitHub

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         REST API + JWT
                               │
                    ┌──────────▼───────────┐
                    │     Spring Boot      │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       Spring Security     PDFBox Parser      MySQL
             │                 │                 │
             ▼                 ▼                 ▼
          JWT Auth        Resume Text       User & Resume
                           Extraction          Data
                               │
                               ▼
                       Resume Analysis
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
             ATS Score     Skill Detection  Suggestions
```

---

## 📂 Project Structure

```text
AI-Resume-Analyzer/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── ...
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
├── database/
│   └── schema.sql
│
├── docs/
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🔄 Application Workflow

```text
1. User Registration
        ↓
2. User Login
        ↓
3. JWT Authentication
        ↓
4. Dashboard
        ↓
5. Upload Resume
        ↓
6. Resume Text Extraction
        ↓
7. Resume Analysis
        ↓
8. ATS Score + Skill Detection
        ↓
9. Improvement Suggestions
        ↓
10. Save Analysis History
        ↓
11. View Results
```

---

# 🔑 Authentication Flow

The application uses JWT-based authentication.

```text
User
  │
  │ Login
  ▼
Spring Boot
  │
  │ Validate Credentials
  ▼
Generate JWT
  │
  ▼
React Frontend
  │
  │ JWT in subsequent requests
  ▼
JWT Authentication Filter
  │
  ▼
Protected API
```

Passwords are securely hashed using BCrypt before being stored in the database.

---

# 🗄️ Database

The application uses MySQL for persistent data storage.

### Main Entities

```text
User
  │
  └── Resume
        │
        ├── Skills
        ├── Analysis
        └── Suggestions
```

The database is responsible for storing user accounts, resume metadata, extracted information, analysis results, and related application data.

---

# 🌐 API Overview

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/auth/register`  | Register a new user       |
| POST   | `/api/auth/login`     | Authenticate user         |
| POST   | `/api/resumes/upload` | Upload a resume           |
| GET    | `/api/resumes`        | Get user's resumes        |
| GET    | `/api/resumes/{id}`   | Get resume details        |
| DELETE | `/api/resumes/{id}`   | Delete a resume           |
| GET    | `/api/dashboard`      | Get dashboard information |

> API endpoints may change as the application evolves.

For detailed API testing, use the included Postman collection if available.

---

# ⚙️ Local Installation

## Prerequisites

Make sure the following are installed:

* Java 17+
* Node.js
* npm
* MySQL
* Git
* Maven (optional because the project includes Maven Wrapper)

---

## 1. Clone the Repository

```bash
git clone https://github.com/Khushboo186/AI-Resume-Analyzer.git

cd AI-Resume-Analyzer
```

---

## 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE resume_analyzer;
```

Run the SQL script provided in:

```text
database/schema.sql
```

---

## 3. Configure Backend Environment Variables

Do not commit real credentials or API keys.

Configure the required environment variables according to your local setup:

```text
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=your_secure_jwt_secret
```

---

## 4. Start the Backend

Navigate to the backend:

```bash
cd Backend
```

Run:

### Windows

```bash
mvnw.cmd spring-boot:run
```

### Linux / macOS

```bash
./mvnw spring-boot:run
```

The backend will start on the configured Spring Boot port.

---

## 5. Start the Frontend

Open another terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite in your browser.

---

# 🔒 Security

The project follows basic security practices including:

* JWT authentication
* BCrypt password hashing
* Protected API endpoints
* User-specific resource access
* Environment-based configuration
* Input validation
* File upload validation

### Important

Never commit:

```text
.env
API keys
Database passwords
JWT secrets
Generated resume files
```

Use environment variables for sensitive configuration.

---

# 🧪 Testing

The application should be tested for both normal and edge-case scenarios.

### Authentication

* Valid registration
* Duplicate email
* Invalid credentials
* Unauthorized requests
* Invalid/expired JWT

### Resume Upload

* Valid PDF
* Invalid file type
* Empty file
* Large file
* Corrupted PDF

### Resume Analysis

* Resume with technical skills
* Resume with no detectable skills
* Different resume formats
* Different experience levels

### Authorization

* Accessing another user's resume
* Deleting another user's resume
* Calling protected APIs without authentication

---

# 🚀 Deployment

The application is designed to be deployed as a full-stack web application.

### Planned Deployment Architecture

```text
                 Internet
                    │
                    ▼
            ┌───────────────┐
            │ React Frontend│
            │  Live Website │
            └───────┬───────┘
                    │
                 HTTPS
                    │
                    ▼
            ┌───────────────┐
            │ Spring Boot   │
            │ REST API      │
            └───────┬───────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     MySQL Database       AI Service
```

Deployment configuration will be added as the project moves to production.

---

# 🧠 Future Improvements

Planned improvements include:

* [ ] AI/LLM-powered resume analysis
* [ ] Role-specific resume matching
* [ ] Job description matching
* [ ] Personalized skill-gap analysis
* [ ] AI-generated improvement recommendations
* [ ] DOCX resume support
* [ ] Resume builder
* [ ] Cover letter generation
* [ ] Job recommendation system
* [ ] Learning roadmap based on missing skills
* [ ] Resume comparison
* [ ] Email notifications
* [ ] Cloud-based resume storage
* [ ] Production deployment
* [ ] Advanced analytics

---

# 🎓 Why This Project?

This project was created to solve a practical problem faced by students and job seekers during internship and placement preparation.

Instead of building a generic CRUD application, the project focuses on applying full-stack development concepts to a real-world use case involving:

* Frontend development
* Backend development
* Database management
* Authentication and authorization
* File processing
* Resume analysis
* AI integration
* API design
* Testing
* Cloud deployment

---

# 📚 What I Learned

Through this project, I gained practical experience in:

* Building RESTful APIs with Spring Boot
* Designing relational databases with MySQL
* Implementing JWT authentication
* Securing passwords using BCrypt
* Connecting React with Spring Boot
* Handling file uploads
* Extracting text from PDF documents
* Designing frontend-backend communication
* Managing application state
* Handling exceptions and validation
* Working with Git and GitHub
* Preparing applications for deployment

---

# 📸 Screenshots

Add screenshots of the major application pages here.

Recommended screenshots:

1. Home Page
2. Login/Register
3. Dashboard
4. Resume Upload
5. ATS Analysis
6. Skill Analysis
7. Suggestions
8. Resume History

Example:

```text
## Dashboard

![Dashboard](docs/screenshots/dashboard.png)

## Resume Analysis

![Resume Analysis](docs/screenshots/analysis.png)
```

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you find a bug or have an idea for improvement:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

---

# 👩‍💻 Author

**Khushboo Raizada**

Computer Science Engineering Student
Full Stack Development

### Connect with me

* GitHub: https://github.com/Khushboo186
* LinkedIn: https://www.linkedin.com/in/khushboo-raizada-2ba24932/
* LeetCode: https://leetcode.com/u/khushi_Thakur27/

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

Your feedback is also welcome and will help improve the project.
