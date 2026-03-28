# 💄 Beauty Salon App

A full-stack beauty salon web application with customer authentication, an online store, services listing, cart, order history, and user profile.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT + js-cookie |

## Features

- 🔐 Customer Registration & Login (JWT)
- 🛍️ Product Store with category filtering
- 🛒 Cart with quantity management
- 💳 Checkout & Order placement
- 💅 Services listing with booking prompt
- 👤 Customer Profile with order history
- 📱 Mobile-responsive design

## Project Structure

```
beauty-salon-app/
├── frontend/          # Next.js 14 app
│   └── src/
│       ├── app/       # Pages (store, cart, services, profile, auth)
│       ├── components/  # Navbar
│       ├── context/   # AuthContext, CartContext
│       └── lib/       # Axios API instance
└── backend/           # Express API
    ├── src/
    │   ├── config/    # MongoDB connection
    │   ├── controllers/
    │   ├── middleware/ # JWT auth middleware
    │   ├── models/    # User, Product, Service, Order
    │   └── routes/
    └── seed.js        # Sample data seeder
```

## Getting Started

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in your MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Seed the Database (optional)
```bash
cd backend
node seed.js
```

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env.local  # Set NEXT_PUBLIC_API_URL
npm run dev
```

App runs at `http://localhost:3000`, API at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/products` | — | List products |
| GET | `/api/services` | — | List services |
| POST | `/api/orders` | ✅ | Place order |
| GET | `/api/orders/my` | ✅ | My orders |
