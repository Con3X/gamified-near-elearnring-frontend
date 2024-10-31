import { Fragment } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import CourseContent from "sections/Quiz/CourseContent/CourseContent";
import { useParams } from "react-router-dom";
export default function QuizPage() {
  const { courseId, lectureId, isNotStartCourse } = useParams();

 

  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <CourseContent courseId={courseId} lectureId={lectureId} isNotStartCourse={isNotStartCourse}/>
      </Layout>
    </Fragment>
  );
}
