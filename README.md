# E-Commerce

A full-stack e-commerce web application built with a Spring Boot backend and a React + Vite frontend. The project supports authentication, role-based access, product/category management, carts, checkout addresses, order management, admin analytics, and online payments through Stripe and Razorpay.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Useful Scripts](#useful-scripts)
- [Development Notes](#development-notes)
- [Production Checklist](#production-checklist)
- [Future Improvements](#future-improvements)

## Overview

This project is a modern e-commerce platform with separate backend and frontend applications.

The backend exposes REST APIs for users, products, categories, carts, addresses, orders, payments, and analytics. It uses Spring Security with JWT-based authentication and role-based authorization.

The frontend provides customer-facing pages, protected checkout flow, authentication pages, and an admin dashboard for managing products, categories, sellers, and orders.

## Tech Stack

### Backend

- Java 23
- Spring Boot 3.4.3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT using JJWT
- PostgreSQL
- Hibernate
- Lombok
- ModelMapper
- Springdoc OpenAPI / Swagger UI
- Stripe Java SDK
- Razorpay Java SDK
- Maven

### Frontend

- React 19
- Vite 7
- React Router DOM
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS 4
- Material UI
- React Hook Form
- React Hot Toast
- Stripe React SDK
- Razorpay Checkout

## Features

### Authentication and Authorization

- User registration and login
- JWT-based authentication using cookies
- Logout support
- Current user profile API
- User account deletion
- Role-based access for USER, SELLER, and ADMIN
- Protected frontend routes
- Admin-only dashboard routes

### Product Management

- Public product listing
- Product search by keyword
- Product filtering by category
- Pagination and sorting
- Admin/seller product creation
- Product update and delete
- Product image update
- Soft delete support for products

### Category Management

- Public category listing
- Admin category creation
- Admin category update
- Admin category deletion

### Cart and Checkout

- Add products to cart
- Update product quantity in cart
- Remove products from cart
- Get logged-in user's cart
- Checkout flow with saved address selection

### Address Management

- Add user address
- Get all addresses
- Get address by ID
- Get logged-in user's addresses
- Update address
- Delete address

### Orders and Payments

- Place orders
- Stripe payment intent/client secret generation
- Razorpay order creation
- Razorpay payment verification
- Admin order listing
- Seller order listing
- Admin order status update

### Admin Dashboard

- Analytics endpoint for admin users
- Admin product management
- Admin category management
- Admin order management
- Seller listing page

## Project Structure

```text
E-Commerce/
├── backend/
│   ├── src/main/java/com/basics/ECommerce/
│   │   ├── Config/
│   │   ├── Controller/
│   │   ├── Model/
│   │   ├── Payload/
│   │   ├── Repository/
│   │   ├── Security/
│   │   ├── Service/
│   │   └── ECommerceApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── Components/
    │   ├── Hooks/
    │   ├── api/
    │   └── store/
    ├── package.json
    └── vite.config.js
```

## Prerequisites

Install the following tools before running the project:

- Java 23 or compatible JDK
- Maven
- Node.js 20 or later
- npm
- PostgreSQL
- Stripe account for payment testing
- Razorpay account for payment testing

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/harsh4823/E-Commerce.git
cd E-Commerce/backend
```

### 2. Create PostgreSQL database

```sql
CREATE DATABASE ecommerce;
```

### 3. Configure backend environment

Example environment configuration:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ecommerce
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_database_password

SPRING_APP_JWTSECRET=replace_with_a_long_random_secret
SPRING_APP_JWTEXPIRATIONMS=86400000
SPRING_APP_JWTCOOKIENAME=springBootEcom

STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_TEST_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

On Windows PowerShell:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/ecommerce"
$env:SPRING_DATASOURCE_USERNAME="postgres"
$env:SPRING_DATASOURCE_PASSWORD="your_database_password"
$env:SPRING_APP_JWTSECRET="replace_with_a_long_random_secret"
$env:STRIPE_SECRET_KEY="your_stripe_secret_key"
$env:RAZORPAY_TEST_ID="your_razorpay_key_id"
$env:RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
```

### 4. Run the backend

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

Swagger UI should be available at:

```text
http://localhost:8080/swagger-ui/index.html
```

## Frontend Setup

### 1. Move to frontend directory

```bash
cd ../frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create frontend environment file

Create a `.env.local` file inside the `frontend` directory:

```bash
VITE_BACK_END_URL=http://localhost:8080
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Run the frontend

The backend currently allows CORS from `http://localhost:3000`, so run Vite on port 3000:

```bash
npm run dev -- --port 3000
```

Frontend URL:

```text
http://localhost:3000
```

## Environment Variables

### Backend

| Variable | Purpose |
| --- | --- |
| `SPRING_DATASOURCE_URL` | PostgreSQL database URL |
| `SPRING_DATASOURCE_USERNAME` | PostgreSQL username |
| `SPRING_DATASOURCE_PASSWORD` | PostgreSQL password |
| `SPRING_APP_JWTSECRET` | JWT signing secret |
| `SPRING_APP_JWTEXPIRATIONMS` | JWT expiration time in milliseconds |
| `SPRING_APP_JWTCOOKIENAME` | JWT cookie name |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `RAZORPAY_TEST_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |

### Frontend

| Variable | Purpose |
| --- | --- |
| `VITE_BACK_END_URL` | Backend server base URL |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key ID |

## API Overview

Base URL:

```text
http://localhost:8080/api
```

### Auth APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/sign-up` | Register a new user |
| `POST` | `/auth/sign-in` | Login user |
| `POST` | `/auth/sign-out` | Logout user |
| `GET` | `/auth/user` | Get logged-in user info |
| `GET` | `/auth/username` | Get current username |
| `DELETE` | `/auth/delete-account` | Delete logged-in user account |
| `GET` | `/auth/sellers` | Get seller list |

### Product APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/public/products` | Get products with search, category, pagination, and sorting |
| `GET` | `/public/products/keyword/{keyword}` | Search products by keyword |
| `GET` | `/public/categories/{categoryId}/products` | Get products by category |
| `GET` | `/admin/products` | Get all products for admin |
| `GET` | `/seller/products` | Get seller products |
| `POST` | `/admin/categories/{category_id}/product` | Add product to category |
| `PUT` | `/admin/products/{productId}` | Update product |
| `PUT` | `/admin/products/{productID}/image` | Update product image |
| `DELETE` | `/admin/products/{productId}` | Delete product |

### Category APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/public/categories` | Get all categories |
| `POST` | `/admin/categories` | Create category |
| `PUT` | `/admin/categories/{id}` | Update category |
| `DELETE` | `/admin/categories/{id}` | Delete category |

### Cart APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/carts/create` | Create or update cart items |
| `POST` | `/carts/products/{productId}/quantity/{quantity}` | Add product to cart |
| `GET` | `/carts` | Get all carts |
| `GET` | `/carts/user/cart` | Get logged-in user's cart |
| `PUT` | `/cart/products/{productId}/quantity/{operation}` | Increment/decrement cart item quantity |
| `DELETE` | `/cart/{cartId}/products/{productId}` | Remove product from cart |

### Address APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/addresses` | Create address |
| `GET` | `/addresses` | Get all addresses |
| `GET` | `/addresses/{addressId}` | Get address by ID |
| `GET` | `/user/addresses` | Get logged-in user's addresses |
| `PUT` | `/addresses/{addressId}` | Update address |
| `DELETE` | `/addresses/{addressId}` | Delete address |

### Order and Payment APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/order/users/payment/{paymentMethod}` | Place order |
| `POST` | `/order/stripe-client-secret` | Create Stripe payment client secret |
| `POST` | `/order/razorpay-order` | Create Razorpay order |
| `POST` | `/verify/payment` | Verify Razorpay payment |
| `GET` | `/admin/orders` | Get all orders for admin |
| `GET` | `/seller/orders` | Get seller orders |
| `PUT` | `/admin/orders/{orderId}/status` | Update order status |

### Analytics API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/admin/app/analytics` | Get admin analytics data |

## Useful Scripts

### Backend

```bash
mvn spring-boot:run
mvn test
mvn clean package
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Future Improvements

- Add product reviews and ratings.
- Add wishlist functionality.
- Add order invoice generation.
- Add email notifications for order confirmation.
- Add seller onboarding flow.
- Add inventory alerts for low-stock products.
- Add image storage using cloud storage such as AWS S3 or Cloudinary.
- Add Docker support for backend, frontend, and PostgreSQL.
- Add integration tests for auth, cart, order, and payment flows.
- Add frontend unit tests using React Testing Library.
