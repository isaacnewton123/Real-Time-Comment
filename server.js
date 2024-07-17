const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
    host: 'localhost', // Sesuaikan dengan host database Anda
    user: 'root', // Sesuaikan dengan username database Anda
    password: 'afosta97', // Sesuaikan dengan password database Anda
    database: 'comment_app' // Sesuaikan dengan nama database yang Anda buat
    
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/comments', upload.single('file'), (req, res) => {
    const { name, comment } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newComment = { name, comment, imageUrl };

    const sql = 'INSERT INTO comments SET ?';
    db.query(sql, newComment, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving comment');
        } else {
            newComment.id = result.insertId;
            io.emit('newComment', newComment);
            res.status(200).send('Comment submitted successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
