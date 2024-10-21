import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";
import CourseHeader from "sections/Course/Course-Details/CourseHeader/CourseHeader";
import CourseLesson from "sections/Course/Course-Details/CourseLesson/CourseLesson";
import CourseContent from "sections/Course/Course-Details/CourseContent/CourseContent";
import { useParams } from "react-router-dom";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
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
        <CourseHeader />
        <CourseLesson />
        <CourseContent content={""} />
      </Layout>
    </Fragment>
  );
}
