const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// const file upload folder
const UPLOAD_FOLDER = './uploads/';
const storaeg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        // important file.pdf => important-file-49248203208.pdf
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')
        + '-'+ Date.now();
        cb(null, fileName + fileExt);
    },
});

// prepare the final multer upload object
const upload = multer({
    // dest: UPLOAD_FOLDER, //dont need it now,created storeg obj.we will use it
    storage: storaeg,
    limits: {
        fileSize: 1000000, // file size 1mb
    },
    // now its time to sanitization
    fileFilter: (req, file, cb) => {
        // applicable for all field
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
                // the callback saying no issue with the typeandtrue for pass sanitize
            } else {
                cb(new Error('only .jpg,.png or .jpeg format is allowed'));
            }
            // docs sanitize
        } else if (file.fieldname === 'doc') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('only .pdf format is allowed'));
            }
        } else {
            cb(new Error('there was an error'));
        }
    },
});
app.get('/', (req, res) => {
    // creating the get req to connect the first req
    res.sendFile(path.join(__dirname, 'file.html'));
});
// multiple field and multiple upload
app.post(
    '/',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'doc', maxCount: 1 },
    ]),
    (req, res) => {
        res.send('hello world');
    },
);

// for single upload files
/* app.post('/', upload.single('avatar'), (req, res) => {
    // to upload multiple file, use upload.array ('avatar',3)
    res.send('hello');
});
*/

// default error handling
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('There was an upload error');
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send('seccess');
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
