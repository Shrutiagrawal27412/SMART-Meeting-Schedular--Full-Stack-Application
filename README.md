# 📅 Meeting Scheduler Web Application

A full-stack Meeting Scheduler application built using **React**, **Spring Boot**, and **MySQL**. It allows users to schedule meetings, avoid conflicts, manage attendees, and streamline communication — ideal for teams and individuals.

---

## 🚀 Features

- 🔐 User authentication (sign-up / login)
- 🗓 Schedule new meetings with date, time, title, and participants
- ⚠️ Prevents scheduling conflicts and overlapping meetings
- 👥 Add attendees to meetings
- 🗃 Stores meetings persistently in MySQL
- 📜 View list of all upcoming meetings
- ❌ Delete or cancel meetings
- ✅ Clean, user-friendly interface using React

---

## 🛠 Tech Stack

### 🔧 Frontend
- **React** (18+)
- **Axios** – API communication
- **React Router** – Page navigation
- **Bootstrap / Tailwind CSS** (Optional – for UI styling)

### ⚙️ Backend
- **Spring Boot** (Java)
- **Spring Web** – RESTful APIs
- **Spring Data JPA** – ORM
- **Spring Security** – Authentication (if implemented)
- **CORS Configurations** for frontend-backend communication

### 🗄️ Database
- **MySQL**
- Tables for `Users`, `Meetings`, `Participants`
- Supports foreign keys and validation constraints

---

## 🔧 Installation & Setup

### 💻 Prerequisites
- Java 17+
- MySQL 8+
- Node.js 18+
- Maven or Gradle

---

### ▶️ Backend (Spring Boot)


# Navigate to backend directory
cd backend

# Configure database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/meetings
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

# Run the application
./mvnw spring-boot:run

### 🌐 Frontend (React)

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the React app
npm start
🔄 API Endpoints (Sample)
Method	Endpoint	Description
GET	/api/meetings	Get all meetings

POST	/api/meetings	Create a new meeting

DELETE	/api/meetings/{id}	Cancel a meeting

POST	/api/auth/signup	Register new user

POST	/api/auth/login	Authenticate user

✨ Future Enhancements
Email reminders to participants

Calendar integration (Google / Outlook)

Role-based access (Admin / User)

Real-time updates via WebSockets

Developed with ❤️ by Shruti Agrawal


