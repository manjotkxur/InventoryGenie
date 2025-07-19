# 🧠 InventoryGenie – Inventory Management System - FullStack

Inventino is a full-stack inventory management app built with the **PERN stack** (PostgreSQL, Express, React, Node.js), designed to help users manage products, suppliers, stock movements, and more with ease — including an AI-powered query system (API + NLP + LLM).

---

## 🛠 Tech Stack

- **Frontend:** React, Axios, Bootstrap/CSS Modules
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Auth:** JWT
- **Testing** Postman
- **AI Integration:** GROQ API + NLP + LLM for natural queries

---

## ✨ Features

- 🔍 AI-powered query interface
- 📦 Product, Category & Supplier management
- 📈 Stock movement tracking (IN / OUT)
- 📊 Analytics dashboard
- 🔐 Secure login/signup with JWT
- 📄 Export reports as PDF
- 🎨 Custom UI with pink theme

---

## 🧰 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/manjotkxur/inventoryGenie.git
```

### 2. Environment Setup
Create a `.env` file in `backend/`:

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
DATABASE_URL
PORT
```

### 3. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Setup Database
```bash
# From the root of the repo (refer attachment)
psql -U postgres -d inventory < schema.sql
```

### 5. Run Development Servers
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```
---

## 📜 License

This project is licensed under the MIT License.
