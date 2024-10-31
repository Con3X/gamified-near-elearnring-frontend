import { Fragment, useEffect, useState } from "react";
import CourseCard from "./CourseCard/CourseCard";
import LatestCoursesStyleWrapper from "./LatestCourse.style";
import { getLatestCourses } from "apiService";

const LatestCourses = ({isValid}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getLatestCourses();
        if(response) {
          const coursesData = response.data;
          setCourses(coursesData);
        }
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    fetchCourses();
  }, [isValid]);

  return courses.length > 0 ? (
    <LatestCoursesStyleWrapper>
      <CourseCard data={courses} />
    </LatestCoursesStyleWrapper>
  ) : (
    <Fragment />
  );
};
export default LatestCourses;
