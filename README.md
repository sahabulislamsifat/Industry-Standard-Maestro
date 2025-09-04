# 🗺️ Tour Management System (FullStack)

A full-stack **Tour Management System** built with the MERN stack.
This system allows users to **explore tours, book packages, make payments**, and provides an admin dashboard to manage everything.

---

## 🚀 Features

### 👤 User Features

- 🏝️ Browse and search tour packages
- 🔍 Filter tours by location, price, or duration
- 📝 Register/Login with JWT authentication
- 📅 Book tours and view booking history
- 💳 Secure online payments
- ⭐ Add reviews and ratings for tours

### 🛠 Admin Features

- ➕ Add, edit, delete tours
- 👥 Manage users and bookings
- 📊 View statistics and analytics dashboard
- 🔒 Role-based access control

---

## 🛠 Tech Stack

### 🌐 Frontend

- React.js (Vite / CRA)
- React Router DOM
- Tailwind CSS / ShadCN UI
- Axios for API calls
- React Query (TanStack) for state management

### ⚙️ Backend

- Node.js
- Express.js
- JWT Authentication
- Multer + Cloudinary for image upload

### 🗄️ Database

- MongoDB (Mongoose ORM)

---

## 📂 Project Structure

Tour-Management-System/
│── client/ # Frontend (React)
│ ├── src/
│ ├── public/
│ └── package.json
│
│── server/ # Backend (Node + Express)
│ ├── src/
│ │ ├── models/ # Mongoose Schemas
│ │ ├── routes/ # Express Routes
│ │ ├── controllers/ # Business Logic
│ │ └── index.js # Entry Point
│ └── package.json
│
│── README.md
│── .env

---

## ⚡ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/tour-management-system.git
cd tour-management-system

2️⃣ Backend Setup
cd server
npm install
npm run dev

3️⃣ Frontend Setup
cd client
npm install
npm run dev

⚙️ Environment Variables

Create .env file inside server/ folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Frontend .env inside client/ folder:

VITE_API_URL=http://localhost:5000/api

🗄️ Database Models
👤 User
{
  name: String,
  email: String,
  password: String (hashed),
  role: { type: String, enum: ["user", "admin"], default: "user" },
  bookings: [ObjectId]
}

🏝️ Tour
{
  title: String,
  description: String,
  price: Number,
  duration: String,
  location: String,
  image: String,
  reviews: [ObjectId]
}

📅 Booking
{
  user: ObjectId,
  tour: ObjectId,
  date: Date,
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" }
}

⭐ Review
{
  user: ObjectId,
  tour: ObjectId,
  rating: Number,
  comment: String
}

📸 Screenshots (Optional)

Add project screenshots here (Home Page, Booking Page, Dashboard, etc.)

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

📜 License

This project is licensed under the MIT License.
```
