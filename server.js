const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const fs = require('fs');

const app = express();

// Serve static files from the root directory
let initial_path = path.join(__dirname, "");
app.use(express.static(initial_path));

// Serve uploaded images from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable file upload middleware
app.use(fileupload());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send("No image uploaded.");
    }

    let file = req.files.image;
    let date = new Date();

    // Sanitize file name
    let imagename = date.getDate() + date.getTime() + file.name.replace(/\s/g, '-');

    // Ensure uploads directory exists
    let uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadPath = path.join(uploadDir, imagename);

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error("Upload error:", err);
            return res.status(500).send("Image upload failed.");
        } else {
            res.json(`uploads/${imagename}`);
        }
    });
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path, "dashboard.html"));
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
});

app.get("/:blog/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

// 404 fallback
app.use((req, res) => {
    res.status(404).json("404 - Page Not Found");
});

// Start the server
app.listen(process.env.PORT || 9600, () => {
    console.log('Server running on port 9600...');
});
