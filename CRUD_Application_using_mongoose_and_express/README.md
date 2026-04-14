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

```
project-root/
│
├── index.js
├── handlers/
│   └── todoHandler.js
├── schema/
│   └── schema.js
└── README.md
```

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
```
git clone <your-repo-link>
cd todo-app
```

### Install dependencies
```
npm install
```

### Run the server
```
node index.js
```

Server runs at:
```
http://localhost:3000
```

---

## 📌 API Endpoints

### Create Todo
```
POST /todos
```

### Get All Todos
```
GET /todos
```

### Get Active Todos
```
GET /todos?status=active
```

### Update Todo
```
PUT /todos/:id
```

### Delete Todo
```
DELETE /todos/:id
```

---

## 🧠 Key Concepts Learned

- Express routing
- Mongoose schema
- Async/Await
- Error handling
- MongoDB queries

---

## 🛠️ Example Code

```js
const data = await Todo.find({ status: 'active' });
console.log(data);
```

---

## 📈 Future Improvements

- JWT authentication
- Validation
- Pagination
- React frontend

---

## 👨‍💻 Author

**Nandan Chakraborty**  
CSE Student | Backend Developer