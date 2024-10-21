import { Fragment } from "react";
import GlobalStyles from "assets/styles/GlobalStyles";
import Layout from "components/layout";
import Header from "sections/Header/v2";
import PageHeader from "sections/TeamDetails/PageHeader";
import EditLesson from "sections/Lesson/EditLesson";
import { useParams } from "react-router-dom";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader
          currentPage="Add Course Info"
          pageTitle={`${lessonId === undefined ? "Add" : "Edit"}  Lesson`}
        />
        <EditLesson courseId={courseId} lessonId={lessonId}/>
      </Layout>
    </Fragment>
  );
}
