import { Fragment, useEffect, useState } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";
import CourseHeader from "sections/Course/Course-Details/CourseHeader/CourseHeader";
import CourseLesson from "sections/Course/Course-Details/CourseLesson/CourseLesson";
import CourseContent from "sections/Course/Course-Details/CourseContent/CourseContent";
import { useParams } from "react-router-dom";
import { getAllLectureForCourse } from "apiService";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllLectureForCourse(courseId);
        const lectureData = response.data;
        setData(lectureData);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    };

    fetchCourses();
  }, [courseId]);

  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader
          currentPage="Course Details"
          pageTitle=""
          isShowShareIcon={true}
        />
        <CourseHeader data={data} />
        <CourseLesson data={data} />
        <CourseContent content={""} />
      </Layout>
    </Fragment>
  );
}
