import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "components/PageHeader/PageHeader";
import CourseInfo from "sections/Course/Course-Info/CourseInfo";
import { useParams } from "react-router-dom";

export default function CourseInfoPage() {
  const {courseId} = useParams();
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader currentPage="Add Course Info" pageTitle="Add Course Info" />
        <CourseInfo courseId={courseId} />
      </Layout>
    </Fragment>
  );
}
