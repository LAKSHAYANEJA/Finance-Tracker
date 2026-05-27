# 💰 Finance Tracker

A full-stack personal finance management application built with the MERN stack. Track your income and expenses, visualize spending patterns, and generate monthly financial reports.

## 🌐 Live Demo
- **Frontend**: https://finance-tracker-laproject.vercel.app
- **Backend API**: https://finance-tracker-api-nlsp.onrender.com

## ✨ Features
- JWT-based authentication (Register/Login)
- Add, view, and delete income/expense transactions
- Real-time balance, income, and expense summary
- Monthly financial reports with interactive charts
- Expense breakdown by category (Doughnut chart)
- Income vs Expense comparison (Bar chart)
- Fully responsive dark theme UI
- Cloud-hosted database (MongoDB Atlas)

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs Password Hashing
- REST API Architecture

### Frontend
- React.js
- React Router DOM
- Axios
- Chart.js + react-chartjs-2
- CSS3 with Glassmorphism Design

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB installed locally

### Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/financetracker
JWT_SECRET=your_secret_key
```
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📊 Key Technical Highlights
- **MongoDB Aggregation Pipeline** for monthly report generation — filters, groups, and calculates totals directly in the database for efficiency
- **JWT Middleware** protects all transaction routes — every request is authenticated
- **Role-based data isolation** — users can only access their own transactions
- **Interceptor-based token management** — JWT automatically attached to every API request

## 📁 Project Structure

finance-tracker/
├── backend/
│   ├── config/        # Database connection
│   ├── middleware/    # JWT auth middleware
│   ├── models/        # User & Transaction schemas
│   ├── routes/        # Auth & transaction routes
│   └── server.js
└── frontend/
├── src/
│   ├── context/   # Auth context & API config
│   ├── pages/     # Login, Register, Dashboard, Report
│   └── index.css
└── public/

## 👨‍💻 Author
**Lakshay Aneja** — [GitHub](https://github.com/LAKSHAYANEJA) | [LinkedIn](https://linkedin.com/in/lakshayaneja4976)
