import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import CourseContent from "sections/Quiz/CourseContent/CourseContent";
import { useParams } from "react-router-dom";

export default function QuizPage() {
  const { lessonId } = useParams();
  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <CourseContent lessonId={lessonId}/>
      </Layout>
    </Fragment>
  );
}
