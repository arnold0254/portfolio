# REST API & Auth System ⚙️

A production-ready RESTful API starter kit featuring secure authentication middleware, rate limiting, helmet security configurations, dynamic routing, and modular controller architectures. Designed for fast scaling and secure deployment.

## 🚀 Live Features
* **JWT Token Authentication**: Secure signup/signin workflows yielding cryptographically secure web tokens.
* **Route Protection Middleware**: Blocks unauthorized clients from accessing delicate user records or administration routes.
* **Express Rate Limiter**: Configures request allowances per IP address window to defend against automated scans or DDoS.
* **Helmet Integrations**: Automatically applies essential HTTP security headers (cross-site scripting shields, frame controllers, etc.).
* **Modular Clean Code Structure**: Segregated routing channels, controller layers, models, and custom error catchers.

## 🛠️ Technology Stack
* **Node.js**: The foundation V8 Javascript runtime engine.
* **Express**: Ultra-minimalist and flexible server framework.
* **jsonwebtoken**: Standard protocol to sign and decode validation keys.
* **express-rate-limit**: Protective middleware guarding endpoint bandwidth.
* **helmet**: Security header injector.

## 📦 Setting Up Environment
Create a `.env` file in the root folder and configure:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secure_secret_key_123456
JWT_EXPIRE=30d
```

## 🔌 API Endpoints Reference
* **POST** `/api/v1/auth/register` — Registers a new user. Expects `name`, `email`, `password`.
* **POST** `/api/v1/auth/login` — Connects returning user. Expects `email`, `password`. Returns JWT.
* **GET** `/api/v1/auth/me` — Private route to retrieve current profile details. Expects `Authorization: Bearer <JWT>` header.

Designed & Engineered by **Arnold Orina Onwong'a**
