import { useEffect, useState } from "react";
import CourseLessonStyleWrapper from "./CourseLesson.style";
import { Link } from "react-router-dom";

const CourseLesson = ({ data }) => {
  const [lessons, setLessons] = useState([]);
  const [isNotStartCourse, setIsNotStartCourse] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedData = [...data].sort((a, b) => a.order - b.order);
      setLessons(sortedData);

      const isCourseNotStarted = sortedData.every(
        (item) =>
          item?.userLecture[0]?.start_at === null ||
          item?.userLecture[0]?.start_at === undefined ||
          item?.userLecture[0] === undefined
      );
      setIsNotStartCourse(isCourseNotStarted);
    }
  }, [data]);

  return (
    <CourseLessonStyleWrapper>
      <div className="container">
        <div className="lesson_row">
          {lessons?.map((data, i) => (
            <div
              key={data.id}
              className={`lesson_item ${
                data?.userLecture[0]?.end_at !== null &&
                data?.userLecture[0]?.end_at !== undefined
                  ? "shape_active"
                  : ""
              }`}
            >
              <Link
                to={`/quiz/${data.course.id}/${data.id}/${isNotStartCourse}`}
              >
                <div className="lesson_item_inner">
                  <h4
                    className={`lesson_title ${
                      data?.userLecture[0]?.end_at !== null &&
                      data?.userLecture[0]?.end_at !== undefined
                        ? "active"
                        : ""
                    }`}
                  >
                    Lesson #{data.order}
                  </h4>
                  <ul className="lesson_check_list">
                    <div className="lesson-name">{data.title}</div>
                    {/* <div className="lesson-small-title">{data.description}</div> */}
                  </ul>
                </div>
              </Link>
              <div className="d-flex flex-column align-items-center mb-2">
                <h3
                  className={`mt-4 mb-4 ${
                    data?.userLecture[0]?.end_at !== null &&
                    data?.userLecture[0]?.end_at !== undefined
                      ? "active"
                      : ""
                  }`}
                >
                  points {data.question.length * 10}
                </h3>
                {lessons.length - 1 !== i && <div className="arrow-down" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CourseLessonStyleWrapper>
  );
};

export default CourseLesson;
