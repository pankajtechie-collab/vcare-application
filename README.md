# 🚀 VCARE 2.0 Application - Local Setup Guide

Welcome to the **VCARE 2.0** project repository! This guide provides step-by-step instructions to set up, build, and run both the **Spring Boot Backend** and **React Frontend** on your local machine.

---

## 🛠️ Tech Stack
* **Frontend:** React (Vite / CRA), Tailwind CSS, `react-icons`
* **Backend:** Spring Boot (Java), Spring Data JPA, REST APIs
* **Database:** Relational Database (e.g., PostgreSQL / MySQL)

---

## ⚙️ Part 1: Backend Setup (Spring Boot)

### **Prerequisites**

* Java Development Kit (JDK 17 or higher)

* Maven or Gradle

* Database server (MySQL) running locally

### **Steps:**

* Navigate to the backend directory:

    ```bash
    cd backend
    cd app
    cd app
    ```

* Configure Database Connection: Open `src/main/resources/application.properties` (or `application.yml`) and update your local database credentials:

    ```yml
    datasource:
        url: jdbc:mysql://localhost:3306/job_management_system_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
        username: root
        password:
        driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
        hibernate:
        ddl-auto: validate # Can be 'create', 'update', or 'validate'
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
        show-sql: true
    ```

* Build and Run the Backend using Maven:

    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

## 💻 Part 2: Frontend Setup (React)

### **Prerequisites**

* Node.js (v16+ recommended)
* npm for node package manager

### **Steps**

* Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

* Install Dependencies:

    ```bash
    npm install
    ```

* Configure API Endpoint (Optional): Ensure your API service wrapper points to your local backend server (`http://localhost:8083/api`).

* Run the Development Server:

    ```bash
    npm run dev
    ```

* Open your browser and access the frontend URL to view the interactive dashboard, test dynamic status filters on the metric cards, search records, and verify pagination with backend connectivity.


### **Note**

    If you see the old folder in terminal while running the spring boot backend app, close the terminal and reopen it again. It will point to the current directory to run the spring boot backend app.
    