# Job Application Tracker (MERN Stack)

A **Job Application Tracker** built using the **MERN stack (MongoDB, Express, React, Node.js)**. This project allows users to create, view, update, and delete job applications in a clean and responsive interface.

---

## 📋 Features
- ✏️ **Add New Job Applications** (Company name, Job title, Date, Status)
- 👀 **View All Applications** in a modern, responsive layout
- 🔍 **View Job Details** (single view)
- 🔄 **Edit Existing Applications**
- ❌ **Delete Applications** with confirmation prompt
- 🧮 **Filter by Status** (Applied / Interview / Offer / Rejected)
- ✅ **Form validation** on both frontend and backend
- 🎨 **Beautiful UI** built with Tailwind CSS
- ⚙️ **Mongoose ODM** for MongoDB integration

---

## 🚀 Getting Started
Follow these steps to set up and run the project locally on any device.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vamsiKampani/Job-Application-tracker.git
cd job-application-tracker
```

*(Replace `vamsiKampani` with your actual GitHub username.)*

---

### 2️⃣ Backend Setup
Navigate into the backend folder and install all required dependencies:
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add your MongoDB connection string:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

> 💡 You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud storage or run MongoDB locally.

Now, start the backend server:
```bash
npm run dev
```
By default, it will run at: **http://localhost:5000**

---

### 3️⃣ Frontend Setup
Open a new terminal window and navigate to the frontend folder:
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend` and specify your backend API URL:
```bash
VITE_API_URL=http://localhost:5000/api
```

Then start the React frontend:
```bash
npm run dev
```
By default, it will run at: **http://localhost:5173**

---

### 4️⃣ Verify Everything is Working
Once both servers are running:
1. Open your browser and visit **http://localhost:5173**.
2. Try adding a new job using the form.
3. Check that your data is displayed correctly and persisted in MongoDB.

---

## 🗂️ Folder Structure
```
job-application-tracker/
├── backend/
│   ├── config/           # Database connection
│   ├── controllers/      # CRUD logic for jobs
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Error handlers
│   └── server.js         # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/          # API calls
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Application pages
    │   └── App.jsx       # Root component
```

---

## 🔧 Tech Stack
| Area | Technology |
|------|-------------|
| Frontend | React, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |

---

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/jobs` | Get all job applications |
| GET | `/api/jobs/:id` | Get a single job application |
| POST | `/api/jobs` | Create a new job application |
| PUT | `/api/jobs/:id` | Update a job application |
| DELETE | `/api/jobs/:id` | Delete a job application |

---

## 🧠 Common Issues
| Issue | Solution |
|--------|-----------|
| `MongoDB connection failed` | Double-check your `MONGO_URI` in `.env` |
| `CORS error` | Ensure `cors()` is enabled in `backend/server.js` |
| `Frontend not fetching data` | Confirm `VITE_API_URL` matches backend URL |

---

## 🤝 Contribution
If you’d like to improve this project:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your fork and open a Pull Request

---

## 📬 Contact
If you have any questions or suggestions, feel free to reach out:

**Author:** [Kampani krishnavamsi]  
**Email:** krishnavamsiofficial9@gmail.com  
**GitHub:** ()

### 🏁 Final Words
This project demonstrates a complete end-to-end MERN stack implementation — showing your ability to handle backend APIs, frontend UI design, validation, and clean architecture.
