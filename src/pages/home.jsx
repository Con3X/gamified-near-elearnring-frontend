import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Banner from "sections/Banner/v1";
import Header from "sections/Header/v1";
import LatestCourses from "sections/Home/LatestCourse/LatestCourse";
import CoursesList from "sections/Home/Courses/CoursesList";

export default function HomePage() {
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <Banner />
        <LatestCourses />
        <CoursesList />
      </Layout>
    </Fragment>
  );
}
