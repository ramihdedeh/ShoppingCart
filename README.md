# React Project - ShoppingCart

This repository contains a React application built with **Vite**, providing a fast and optimized development environment. The project focuses on creating a functional shopping cart for a modern web application.

---

## Setup

This template provides a minimal setup to get a React application running quickly using **Vite** with Hot Module Replacement (HMR).

### Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [npm](https://www.npmjs.com/) 

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramihdedeh/ShoppingCart.git

## Running the Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd shoppingcart
   ```
## install dependecies 
   ```bash
   npm install / npm build
   ```
## start the react developement server  
   ```bash
   npm run dev 
   ```
## open your browser and navigate to 
```bash
http://localhost:5173
```
## Backend (Express)

### 1. Navigate to the Backend Directory

To work with the backend, navigate to the backend directory:

```bash
cd backend
```
### 2. Configure the Database Connection

Before running the backend, you need to configure the database connection. Follow these steps:

1. Open the configuration file:
```bash
backend/models/index.js
```

2. Add the following database configuration:

```properties
const sequelize = new Sequelize('shoppingcart', 'root', 'password', {
  host: '127.0.0.1',
  dialect: 'mysql',
});
```
### 3. Build the Backend

To build the backend, run the following command in the `springboot-backend` directory:

```bash
npm build
```
### 5. Run the Backend Server

To start the Express backend server, follow these steps:

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2.Run the following command to start the server:
   ```bash
   node server.js
   ```
3.Once the server is running, it will be accessible at:
```bash
http://localhost:5000
```
### 6. Database Setup

If the database does not already exist, follow these steps to create it:

1. Open your MySQL terminal or a database client like MySQL Workbench.

2. Run the following SQL command to create the database:
   ```sql
   CREATE DATABASE your_database_name;



## Features

Fast Development: Built with Vite for an optimized development workflow.
Live Reload and HMR: Changes to your code are reflected immediately in the browser.
Modern Frontend: Built using React with support for JSX and functional components.
CSS Modules: Style your components with scoped CSS for better maintainability.

**Technologies**

This project leverages the following technologies:

React: Frontend library for building dynamic user interfaces.
Vite: Build tool for blazing-fast development and optimized builds.
Node.js: JavaScript runtime for managing dependencies and scripts
Express: backend library for building backend 
