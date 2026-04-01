const express = require('express');

const app = express();
app.use(express.json());
// it will only parse json body if the content type is json  other type will ignore it

app.get('/', (req, res) => {
    res.send('this is home page');
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('this is home page with post req');
});

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});

/*
1. express.json()

👉 JSON data parse korar jonno use hoy

Only works when:

Content-Type: application/json
Parsed data → req.body

✔ Example:

app.use(express.json());

📝 Note: JSON na hole ignore kore

2. express.urlencoded()

👉 Form data (HTML form) handle kore

Works with:

application/x-www-form-urlencoded
Form input → req.body

✔ Example:

app.use(express.urlencoded({ extended: true }));

📝 Note: login/signup form er jonno use hoy

3. express.raw()

👉 Raw binary data receive kore (buffer format e)

✔ Example:

app.use(express.raw());

📝 Note: rarely use, mostly special cases (like webhooks)

4. express.text()

👉 Plain text data parse kore

Works with:

text/plain

✔ Example:

app.use(express.text());

📝 Note: body string hisebe pabe

5. express.static()

👉 Static file serve kore (CSS, JS, images)

✔ Example:

app.use(express.static('public'));

📝 Note: browser directly file access korte pare

6. express.Router()

👉 Route gulo modular vabe organize korte use hoy

✔ Example:

const router = express.Router();

📝 Note: large project e clean code maintain korte help kore

*/
