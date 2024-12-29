import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', image: null });
  const [courseToModify, setCourseToModify] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('image', form.image);

    try {
      if (courseToModify) {
        await axios.put(`http://localhost:5000/api/courses/${courseToModify.id}`, formData);
        setCourses(courses.map(course => course.id === courseToModify.id ? { ...course, ...form } : course));
      } else {
        await axios.post('http://localhost:5000/api/courses', formData);
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      }
      setForm({ title: '', price: '', image: null });
      setCourseToModify(null);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };
  
  const handleModify = (course) => {
    setCourseToModify(course);
    setForm({ title: course.title, price: course.price, image: null });
  };

  return (
    <div>
      <h1>Admin Course Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button type="submit">
          {courseToModify ? 'Modify Course' : 'Add Course'}
        </button>
      </form>

      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.price} DT</p>
            {course.image && (
              <img
                src={`http://localhost:5000${course.image}`}
                alt={course.title}
                width="100"
              />
            )}
            <button onClick={() => handleDelete(course.id)}>Delete</button>
            <button onClick={() => handleModify(course)}>Modify</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
