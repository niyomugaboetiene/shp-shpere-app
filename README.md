# 🛍️ ShopSphere – Modern E-Commerce Platform

ShopSphere is a modern, responsive e-commerce web application designed to provide customers with a convenient online shopping experience. It allows users to explore products, search for items, manage shopping carts, save favorites, and discover products across different categories.

The platform also provides product management capabilities for administrators and sellers, making it easier to manage an online store.

## 📸 Overview of the App

![ShopSphere App](appImage.png)

## ✨ Features

### 👤 User Authentication
- User registration and login.
- Secure password hashing.
- User profile management.
- Role-based access for customers, sellers, and administrators.

### 🛒 Shopping Experience
- Browse available products.
- Explore different product categories.
- View product details.
- Search for products.
- Add products to the shopping cart.
- Save favorite products.
- Manage cart items.

### ❤️ Favorites
- Like and save products.
- View your favorite products.
- Easily access products you are interested in.

### 📦 Product Management
- Add new products.
- Upload product images using Multer.
- Update existing product information.
- Delete products.
- Manage product listings.
- Organize products by category.

### 🔍 Search Functionality
- Search for products.
- Display matching search results.
- Find products more easily.

### 📱 Responsive Design
- Mobile-friendly interface.
- Responsive layouts for tablets and desktops.
- Easy navigation across different screen sizes.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Icons
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Bcrypt
- Express Session
- CORS
- Nodemailer

### Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- MongoDB Atlas – Cloud database

## 📂 Project Structure

```text
ShopSphere/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── models/
    ├── routes/
    ├── uploads/
    ├── index.js
    ├── package.json
    └── .env
```

*Note: This is an illustrative structure. Adjust it to match your actual project folders.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/niyomugaboetiene/shp-shpere-app
```

### 2. Navigate to the Project

```bash
cd ShopSphere
```

### 3. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Add any other required environment variables, such as session secrets and email credentials.

Start the backend:

```bash
npm start
```

### 4. Setup the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `VITE_BACKEND_URL` | Backend API URL |

Never upload sensitive credentials or `.env` files to GitHub.

## 🚀 Deployment

ShopSphere can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

For production deployment, configure your frontend backend URL and all required environment variables using the deployment platforms.

## 🎯 Project Goals

ShopSphere aims to:

- Make online shopping easier and more convenient.
- Provide customers with an intuitive shopping experience.
- Help sellers and administrators manage products.
- Improve product discovery through search and categories.
- Provide a responsive shopping experience across devices.

## 👨‍💻 Developer

**Etiene Niyomugabo**

Student | Full-Stack Developer | Tech Enthusiast | AI Developer |

GitHub: [@niyomugaboetiene](https://github.com/niyomugaboetiene)

## 📄 License

This project is developed for educational and practical purposes. An open-source license can be added if you intend to allow others to reuse and distribute the code.
