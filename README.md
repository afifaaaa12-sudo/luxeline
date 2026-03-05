Luxeline – Full Stack E-Commerce Platform

Luxeline is a modern full-stack fashion e-commerce web application designed to deliver a smooth, secure, and scalable online shopping experience. The project focuses on clean UI, secure authentication, efficient state management, and real-world e-commerce features such as cart management, order tracking, and online payments.

The application is built using the MERN stack and integrates essential technologies such as JWT authentication, Stripe payments, CORS handling, and real-time notifications using toast alerts.

Features
User Authentication

Secure user registration and login system

JWT based authentication for protected routes

Token verification for user sessions

Password protection and secure API communication

Shopping Experience

Browse products with detailed product pages

Add items to cart and manage cart quantity

Dynamic cart updates with real-time price calculation

Smooth navigation using React Router

Checkout & Orders

Place orders using Cash on Delivery (COD) or Stripe payment gateway

Order history tracking for users

Secure payment processing using Stripe APIs

Admin Dashboard

Add new products to the store

Update or remove existing products

Manage customer orders

View product listings and order details

UI & UX Enhancements

Responsive design for different screen sizes

Toast notifications for actions such as login, cart updates, and order placement

Clean and minimal modern UI for fashion e-commerce

Tech Stack
Frontend

React.js

React Router

Context API (State Management)

Axios

React Toastify

Backend

Node.js

Express.js

MongoDB

Authentication & Security

JWT (JSON Web Token)

CORS configuration for secure API access

Payments

Stripe Payment Integration

Project Structure
Luxeline
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   └── assets
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   └── middleware
│
└── README.md
Installation
1. Clone the repository
git clone https://github.com/your-username/luxeline.git
cd luxeline
2. Install dependencies

Frontend

cd frontend
npm install
npm run dev

Backend

cd backend
npm install
npm start
Environment Variables

Create a .env file in the backend directory.

Example:

PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
API Highlights

Authentication

POST /api/user/register

POST /api/user/login

Products

GET /api/product/list

POST /api/product/add

DELETE /api/product/remove

Orders

POST /api/order/place

GET /api/order/userorders

Key Functional Concepts

JWT Authentication
Used to protect private routes and maintain user sessions securely.

CORS Handling
Configured to allow secure communication between frontend and backend servers.

Stripe Integration
Handles online payments with secure transaction processing.

Toast Notifications
Provides real-time feedback for user actions such as login success, cart updates, and order confirmations.

Future Improvements

Product search and filtering

Wishlist functionality

User profile management

Email notifications for orders

Advanced admin analytics dashboard
