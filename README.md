# CarSure 🚗

**CarSure** is a premium quality car buying and selling web application built with a modern tech stack. It supports role-based authentication, product and order management, and an intuitive, responsive UI. The platform allows users to securely purchase cars, manage profiles, and explore various models, brands, and categories.

> 🔗 **Live Demo:** [https://car-sure.vercel.app/](https://car-sure.vercel.app/)  
> 🌐 **Backend API:** [https://car-sure-backend.vercel.app/](https://car-sure-backend.vercel.app/)

---

## 🔥 Features

### ✅ Public Features

- **Home Page**

  - Logo, Favicon, Navigation (Responsive Navigation bar)
  - Banner with promotional highlights
  - Ours specialty section
  - Featured Products (8 max) with "View All" button
  - Custom car making service section
  - Our Brans section
  - Car Gallery
  - Testimonials section
  - Frequently Asked Questions section
  - Footer with links and social icons

- **All Products Page**

  - Text Search: brand, car name, or category
  - Filters: price range, model, brand, category, availability
  - Dynamic results based on filters
  - Product cards with details and "View Details" button

- **Product Details Page**

  - Product image and specs
  - “Buy Now” button linking to Checkout

- **About Page**
  - Mission statement
  - Business overview

### 🔒 Private & Role-Based Features

- **Authentication**

  - Register with name, email, and password
  - Login with JWT stored in `localStorage`
  - Logout clears session
  - Default role: `user`

- **Checkout**

  - Prevent orders exceeding stock
  - Show order summary and user info
  - SurjoPay payment gateway integration
  - "Order Now" confirmation flow

- **Dashboard**
  - **User Dashboard**
    - View personal orders
    - Update profile and password (with current password verification)
  - **Admin Dashboard**
    - Manage Users: deactivate accounts
    - Manage Products: create, read, update, delete
    - Manage Orders: update status, delete

---

## 🎨 UI/UX Highlights

- Fully responsive design
- Dark & Light mode support
- Clean, accessible layout using Tailwind + ShadCN
- Skeleton(instead of normal boring spinner/loader) during API calls
- Toast notifications for user actions (e.g., login, errors, orders)

---

## 💻 Tech Stack

### Frontend

- **Vite + React + TypeScript**
- **Tailwind CSS v4**
- **Redux Toolkit** for state management
- **ShadCN UI** for modern UI components
- **React Router DOM** for routing
- **React Hook Form** for form handling

### Backend

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Zod Validation**
- **JWT Authentication**
- **Cloudinary** for image uploads
- **SurjoPay** Payment Integration

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js (v18 or above)
- MongoDB
- Cloudinary credentials
- SurjoPay test credentials

---

### 🔧 Backend Setup

```bash
# Clone the repo
git clone https://github.com/developer-shourav/CarSure-Backend.git
cd CarSure-Backend

# Install dependencies
npm install

# Add environment variables
# Create a `.env` file and add:
PORT=5000
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SURJOPAY_SECRET=your_surjopay_secret
SURJOPAY_STORE_ID=your_store_id

# Start the server
npm run start:dev

```

### 🖥️ Frontend Setup

```bash
# Clone the repo
git clone https://github.com/developer-shourav/CarSure-Frontend.git
cd CarSure-Frontend

# Install dependencies
npm install

# Start the app
npm run dev
```

---

## 📽️ Project Introduction Video

## Project Overview Video

<a href='https://drive.google.com/file/d/1jkaWCtRyiTNzr66utA6GmntsW322MY2S/view?usp=sharing' target=_blank>
    <img width='350px' src="https://i.ibb.co.com/0RjxFvKS/watch-video-button-01.png" />
</a>

---

## 📂 Repositories

- **Frontend GitHub Repo:** [github.com/developer-shourav/CarSure-Frontend](https://github.com/developer-shourav/CarSure-Frontend)
- **Backend GitHub Repo:** [github.com/developer-shourav/CarSure-Backend](https://github.com/developer-shourav/CarSure-Backend)

---

## 🙌 Acknowledgements

Special thanks to mentors, instructors, and the web dev community of Programming Hero for support.

---

## 📧 Contact

**Developer:** Shourav Rajbongshi  
**Email:** [developer.shourav1@gmail.com]  
**LinkedIn:** [linkedin.com/in/developer-shourav](https://linkedin.com/in/developer-shourav)
