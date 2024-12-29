import React, { useState, useEffect } from "react";
import "./Home.css";
import Discover from "../../components/Discover/Discover";
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Discover />
      <div className="courses">
        <ul className="courses-list">
          {courses.map((course) => (
            <div key={course.id} >
              {course.image && (
                <img
                  src={`http://localhost:5000${course.image}`}
                  alt={course.title}
                  className="img-course"
                />
              )}              
              <h3 className="title">{course.title}</h3>
              <p className="price">{course.price} DT</p>

            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
