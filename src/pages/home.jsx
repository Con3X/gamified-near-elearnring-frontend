import { Fragment, useState } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Banner from "sections/Banner/v1";
import Header from "sections/Header/v1";
import LatestCourses from "sections/Home/LatestCourse/LatestCourse";
import CoursesList from "sections/Home/Courses/CoursesList";
import Footer from "sections/Footer/v1";

export default function HomePage() {
  const [isValid, setIsValid] = useState(false);

  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header isValid={isValid} setIsValid={setIsValid}/>
        <Banner />
        <LatestCourses isValid={isValid}/>
        <CoursesList />
        <Footer />
      </Layout>
    </Fragment>
  );
}
