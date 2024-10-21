import CourseLessonStyleWrapper from "./CourseLesson.style";
import { testData } from "./index";

const CourseLesson = () => {
  return (
    <CourseLessonStyleWrapper>
      <div className="container">
        <div className="lesson_row">
          {testData?.map((data, i) => (
            <div
              key={data.id}
              className={`lesson_item ${
                data.endAt !== null ? "shape_active" : ""
              }`}
            >
              <a href={`/quiz/${data.id}`}>
                <div className="lesson_item_inner">
                  <h4
                    className={`lesson_title ${
                      data.endAt !== null ? "active" : ""
                    }`}
                  >
                    Lesson #{data.number}
                  </h4>
                  <ul className="lesson_check_list">
                    <div className="lesson-name">{data.lessonName}</div>
                    <div className="lesson-small-title">{data.smallTitle}</div>
                  </ul>
                </div>
              </a>
              <div className="d-flex flex-column align-items-center mb-2">
                <h3
                  className={`mt-4 mb-4 ${data.endAt !== null ? "active" : ""}`}
                >
                  point {data.point}
                </h3>
                {testData.length - 1 !== i && <div className="arrow-down" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CourseLessonStyleWrapper>
  );
};

export default CourseLesson;
