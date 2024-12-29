const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

let courses = [];

app.get('/api/courses', (req, res) => res.json(courses));

app.post('/api/courses', upload.single('image'), (req, res) => {
  const { title, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const course = { id: Date.now(), title, price, image };
  courses.push(course);
  res.json({ message: 'Course added', course });
});

app.put('/api/courses/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const course = courses.find((c) => c.id == id);
  if (course) {
    course.title = title || course.title;
    course.price = price || course.price;
    course.image = image || course.image;
    res.json({ message: 'Course updated', course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  courses = courses.filter((c) => c.id != id);
  res.json({ message: 'Course deleted' });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
