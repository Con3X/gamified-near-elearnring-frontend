import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import CoursesListStyleWrapper from "./CoursesList.style";
import { FiSearch } from "react-icons/fi";
import { getAllCourses } from "apiService";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        const coursesData = response.data;
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesListStyleWrapper>
      <div className="container pb-5">
        <div>
          <div className="breadcrumb_form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                id="Search"
                name="search"
                placeholder="Search Course"
              />
              <button>
                <FiSearch />
              </button>
            </form>
            <div className="btn" onClick={() => {}}>
              Newest
            </div>
            <div className="btn" onClick={() => {}}>
              Biggest Points
            </div>
            <div className="btn" onClick={() => {}}>
              My Courses
            </div>
            <div className="btn" onClick={() => {}}>
              All Courses
            </div>
          </div>
        </div>
        <div className="row">
          {courses?.map((filteredCourse, j) => (
            <div key={j} className="col-lg-3 col-md-6">
              <CourseCard {...filteredCourse} />
            </div>
          ))}
        </div>
      </div>
    </CoursesListStyleWrapper>
  );
}
