import { Fragment, useEffect } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import CourseContent from "sections/Quiz/CourseContent/CourseContent";
import { useParams } from "react-router-dom";
import { createStartInCourse } from "apiService";
export default function QuizPage() {
  const { courseId, lectureId, isNotStartCourse } = useParams();

  useEffect(() => {
    const createStartCourse = async () => {
      try {
        await createStartInCourse(courseId);
      } catch {}
    };

    if (isNotStartCourse === "true") {
      createStartCourse();
    }
  }, [courseId, isNotStartCourse]);

  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <CourseContent courseId={courseId} lectureId={lectureId} />
      </Layout>
    </Fragment>
  );
}
