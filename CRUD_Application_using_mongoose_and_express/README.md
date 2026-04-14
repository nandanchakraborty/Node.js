# 📝 Todo App (Node.js + MongoDB)

A simple and clean Todo API built using Node.js, Express, and MongoDB. This project demonstrates basic CRUD operations and proper backend structure using route handlers and schema modeling.

---

## 🚀 Features

- Create a new todo  
- Get all todos  
- Filter todos by status (active/inactive)  
- Update todo status  
- Delete a todo  
- Structured project architecture  

---

## 🏗️ Project Structure


project-root/
│
├── index.js # Entry point of the application
├── models/
│ └── todoSchema.js # Mongoose schema for Todo
├── handlers/
│ └── todoHandler.js # Business logic (CRUD operations)
├── routes/
│ └── todoRoutes.js # API routes
├── package.json
└── README.md


---

## ⚙️ Technologies Used

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- Docker (optional)  

---

## 📦 Installation

### Clone the repository

git clone <your-repo-link>
cd todo-app


### Install dependencies

npm install


### Start MongoDB (Docker)

docker start mongodb


### Run the server

node index.js


Server will start at:

http://localhost:3000


---

## 📌 API Endpoints

### ➤ Create Todo

POST /todos


Body:
```json
{
  "title": "Learn Node.js",
  "description": "Practice Express and MongoDB",
  "status": "active"
}
➤ Get All Todos
GET /todos
➤ Get Active Todos
GET /todos?status=active
➤ Update Todo
PUT /todos/:id
➤ Delete Todo
DELETE /todos/:id
🧠 Key Concepts Learned
Express routing and middleware
Mongoose schema and models
Async/Await handling
Error handling in APIs
MVC-like structure in Node.js
MongoDB queries
🛠️ Example Code
const data = await Todo.find({ status: 'active' });
console.log(data);
📈 Future Improvements
Add authentication (JWT)
Add validation
Pagination
Frontend (React)
👨‍💻 Author

Nandan Chakraborty
CSE Student | Backend Developer (Learning Phase)