import React, { useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import CoursesListStyleWrapper from "./CoursesList.style";
import { FiSearch } from "react-icons/fi";
import { getAllCourses, searchOnCourses } from "apiService";

export default function CoursesList() {
  const searchRef = useRef("");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      const coursesData = response.data;
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses data:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = async () => {
    if (searchRef.current.value !== "") {
      try {
        const response = await searchOnCourses(searchRef.current.value);
        const coursesData = response.data;
        setCourses(coursesData);
      } catch (error) {
        console.log(`Error search data: ${error}`);
      }
    } else {
      fetchCourses();
    }
  };
  return (
    <CoursesListStyleWrapper>
      <div className="container pb-5">
        <div>
          <div className="breadcrumb_form">
            <div className="search-div">
              <input
                ref={searchRef}
                type="text"
                id="search"
                name="search"
                placeholder="Search Course"
                onChange={(e) => handleSearch()}
              />
              <button onClick={() => handleSearch()}>
                <FiSearch />
              </button>
            </div>
            {/* <div className="btn" onClick={() => {}}>
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
            </div> */}
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
