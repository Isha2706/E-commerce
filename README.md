# 🛍️ E-Commerce Glam Up

A full-featured, responsive **E-commerce web application** built using the **MERN stack** — ReactJS, Redux Toolkit, Node.js, Express, and MongoDB. It supports product browsing, user authentication, admin dashboards, payment integration, and more.

## 🌐 Live Preview

> _e-commerce-amber-eight.vercel.app_

## 🛠 Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Material UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Payment Integration:** Stripe

## 🔐 Environment Variables

Create a `.env` file in the **backend** and **frontend** directories with the following variables:

### Backend (`.env`)
```env
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
SECRET_KEY=your_stripe_secret_key
```

### Frontend (`.env`)
```env
VITE_API_URI=your_backend_api_url
VITE_API_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 📦 Key Libraries Used

### Backend
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken
- multer
- stripe

### Frontend
- react-router-dom
- react-icons
- axios
- @mui/material
- @mui/icons-material
- @mui/x-data-grid
- @reduxjs/toolkit
- react-redux
- jwt-decode
- @stripe/stripe-js

## 🧪 Features
- ✅ Product listing and detail view
- 🛒 Shopping cart and checkout
- 👤 User registration and login with JWT auth
- 🧾 Order tracking and history
- 🔐 Admin dashboard for managing users, products, and orders
- 💳 Stripe payment gateway integration
- 🖼️ Image upload with Multer
- ⚙️ Responsive UI for mobile and desktop

## 🏁 Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Isha2706/E-commerce.git
   cd E-commerce
   ```
   
2. **Install Dependencies**

   For both frontend and backend:
   ```bash
   npm install
   ```
   
4. **Start the Server**

   In the backend directory:
   ```bash
   npm start
   ```
   
5. **Start the Client**
   
   In the frontend directory:
   ```bash
   npm run dev
   ```

## 👨‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.
