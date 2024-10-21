import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Header from "sections/Header/v2";
import PageHeader from "components/pageHeaderWithButtom/PageHeaderWithButton";
import ShowLesson from "sections/Lesson/ShowLesson/ShowLesson";
import { useParams } from "react-router-dom";

export default function ShowLessonPage() {
  const { courseId } = useParams();
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader
          currentPage="Add Course Info"
          pageTitle="Course Lesson"
          buttonName={"Add Lesson"}
          href={`/add-lesson/${courseId}`}
        />
        <ShowLesson courseId={courseId} />
      </Layout>
    </Fragment>
  );
}
