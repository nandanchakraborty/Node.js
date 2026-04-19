# 📝 Todo API (Node.js + Express + MongoDB)

A clean and structured RESTful Todo API built with Node.js, Express, and MongoDB. This project demonstrates real-world backend practices including routing, middleware, schema design, and authentication using JWT.

---

## 🚀 Features

- User authentication (Signup & Login)
- Create, read, update, and delete todos (CRUD)
- Filter todos by status (`active` / `inactive`)
- Protected routes using JWT
- Clean and modular folder structure
- Async/await-based API handling
- Error handling middleware

---

## 🏗️ Project Structure

```
project-root/
│
├── index.js                  # Entry point
├── routeHandler/
│   ├── todoHandler.js        # Todo routes
│   └── userHandler.js        # User auth routes
├── middleware/
│   └── checkLogin.js         # JWT middleware
├── schema/
│   ├── todoSchema.js         # Todo schema
│   └── userSchema.js         # User schema
└── README.md
```

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)
- Docker (optional)

---

## 📦 Installation & Setup

### 1. Clone the repository
```
git clone <your-repo-link>
cd todo-app
```

### 2. Install dependencies
```
npm install
```

### 3. Setup environment variables

Create a `.env` file in root:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server
```
node index.js
```

Server runs at:
```
http://localhost:3000
```

---

## 🔐 Authentication (JWT)

Protected routes require a token.

### Add in request header:
```
Authorization: Bearer <your_token>
```

---

## 📌 API Endpoints

### 👤 User Routes

#### ➕ Signup
```
POST /users/signup
```

#### 🔑 Login
```
POST /users/login
```

---

### 📝 Todo Routes

#### ➕ Create Todo
```
POST /todos
```

#### 📄 Get All Todos
```
GET /todos
```

#### 🔍 Get Active Todos
```
GET /todos?status=active
```

#### ✏️ Update Todo
```
PUT /todos/:id
```

#### ❌ Delete Todo
```
DELETE /todos/:id
```

---

## 🧪 Example Code

```js
const data = await Todo.find({ status: 'active' });
console.log(data);
```

---

## 📈 Future Improvements

- Input validation (Joi / Validator)
- Pagination & search
- Role-based authentication
- Refresh tokens
- Frontend integration (React)

---

## 👨‍💻 Author

**Nandan Chakraborty**  
CSE Student | Backend Developer