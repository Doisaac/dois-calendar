<div align="center">

  # 📆 Dois-Calendar

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)


</div>


# 📅 DOIS Calendar

DOIS Calendar is a calendar web application, where users can **create, edit, and delete events** through an intuitive and interactive interface focused on productivity and usability.

The frontend communicates with a **RESTful backend API** that handles **JWT-based authentication** and full **event management (CRUD)**.

🔗 Backend repository:
https://github.com/Doisaac/dois-calendar-backend

---

## ✨ Features

### 🗓️ Calendar Module
- Day, week, and month calendar views  
- Create events with **start/end date and time**, title, and notes  
- Select and highlight the active event  
- Visual distinction between **own events and other users’ events**

### 🔐 Auth Module
- User registration and login  
- Session persistence using **JWT tokens**  
- Protected routes (only authenticated users can manage events)

### ⚙️ Events Module (CRUD)
- **Create** new calendar events  
- **Edit** existing events  
- **Delete** events  
- Input validation (required fields, valid dates)  
- Authorization checks (only the event owner can modify or delete events)

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- React Big Calendar
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 🚀 Getting Started

1. Clone the backend repository and follow the steps described in the README.md:
   ```bash
   git clone https://github.com/Doisaac/dois-calendar-backend
   ```

2. Once the backend is up and running, clone this repository and install the dependencies.
   ```bash
   pnpm install
   ```

3. Configure the environment variables by copying the `.env.template` file and renaming it to `.env`.
   
4. Run the application:
   ```bash
   pnpm run dev
   ```

