FlavorHaus – Online Food Delivery App

FlavorHaus is a complete online ordering platform that allows users to discover menu items, place an order, and pay online (simulation). The project consists of a React frontend and a Spring Boot backend, connected to a MongoDB database and Stripe for payments.
I built this project to create a modern full-stack system that covers real-world requirements in the food delivery domain.

Features Frontend:
  - Modern React application with Vite
  - I18n translation (German & English)
  - User registration and login (JWT-based)
  - Overview of all dishes
  - Shopping cart system
  - Checkout including real-time validation
  - Redirect to Stripe for secure payments
  - Success and error pages after payment
  - Responsive UI with clear structure

Backend:
  - Spring Boot REST API
  - MongoDB Atlas as database
  - JWT authentication
  - Management of users, shopping cart, orders and dishes
  - Stripe integration for payments
  - Custom security layer and CORS configuration
  - Deployment on Railway

Tech Stack Frontend:
  - React (Vite)
  - React Router
  - Context API
  - Axios
  - i18next
  - Bootstrap / Custom UI

Backend:
  - Java 17
  - Spring Boot
  - Spring Security + JWT
  - MongoDB Atlas
  - Stripe Java SDK


Deployment:
  - Frontend: Netlify
  - Backend: Railway
  - Database: MongoDB Atlas

Live Demo:
  - Frontend (Netlify): https://flavorhaus.netlify.app/
  - Backend (Railway API): https://foodrestapi-production-471c.up.railway.app/api/foods

Security:
  - Passwords are hashed (BCrypt)
  - Token-based authentication (JWT)
  - CORS carefully configured (for Netlify and local development)
  - Stripe secret keys are exclusively used as environment variables

Payments with Stripe (Sandbox):
  - The app uses Stripe Checkout (simulation). After submitting an order, a Stripe session is automatically created. The user is then redirected to:

  - Successful payment → /payment/success/:orderId
  - Failed payment → /payment/fail/:orderId

Goal of the Project:
I wanted to build a project that:
  - Is fully production-ready
  - Combines modern technologies
  - Solves real problems
  - Serves as a reference project for job applications
With FlavorHaus I built a complete full-stack application that works from registration to payment.

Status:
  The project is finished, deployed and production-ready. Additional features such as an admin panel, ratings or real-time notifications can be added in the future.

Author:
Abdullah Al-Qazzaz – Computer Science Student
I welcome feedback, ideas or questions about the project!
