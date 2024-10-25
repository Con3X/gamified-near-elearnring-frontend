import Header from "sections/Quiz/Header";
import { Fragment, useEffect, useState } from "react";
import CourseContentWrapper from "./CourseContent.style";
import ProgressBar from "components/progressBar";
import CourseTitle from "./CourseTitle/CourseTitle";
import correctIcon from "assets/images/icons/correct.png";
import unCorrectIcon from "assets/images/icons/unCorrect.png";
import {
  getAllQustionForLecture,
  createStartUserLectureInCourse,
  updateFinishLectureInCourse,
} from "apiService";

export default function CourseContent({ courseId, lectureId }) {
  const [data, setData] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionSequence, setCurrentQuestionSequence] = useState(1);

  // Create User Lecture
  useEffect(() => {
    const createStartUserLecture = async () => {
      try {
        await createStartUserLectureInCourse(courseId, lectureId);
      } catch {}
    };
    createStartUserLecture();
  }, [courseId, lectureId]);

  // Get Qustion For This Lecture
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getAllQustionForLecture(courseId, lectureId);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };
    fetchQuestion();
  }, [courseId, lectureId]);

  // Sort Qustion According By sequence
  const sortedQuestions = data.sort((a, b) => a.sequence - b.sequence);

  // Get Qustion According By sequence
  const currentQuestion = sortedQuestions.find(
    (question) => question.sequence === currentQuestionSequence
  );

  // Handle Answare Change
  const handleAnswerChange = (id) => {
    const currentAnswers = [...selectedAnswers];
    if (currentAnswers.includes(id)) {
      const updatedAnswers = currentAnswers.filter(
        (answerId) => answerId !== id
      );
      setSelectedAnswers(updatedAnswers);
    } else {
      setSelectedAnswers([...currentAnswers, id]);
    }
  };

  const handleCheckAnswers = () => {
    // Get Correct Answare For Current Qustion
    selectedAnswers.join(", ");
    
    // setIsCorrect(isAllCorrect);
  };

  const handleNextQuestion = async () => {
    setSelectedAnswers([]);
    setIsCorrect(null);

    // Move To Next Qustion
    setCurrentQuestionSequence((prevNumber) =>
      prevNumber < sortedQuestions.length ? prevNumber + 1 : prevNumber
    );

    if (currentQuestionSequence === sortedQuestions.length) {
      await updateFinishLectureInCourse(courseId, lectureId);
      alert("You are finish");
    }
  };

  return (
    <Fragment>
      <CourseContentWrapper>
        <div className="course-content">
          <div className="section-1">
            <Header />
            <div className="content-left">
              <div
                dangerouslySetInnerHTML={{
                  __html: data[0]?.lecture.description,
                }}
              />
            </div>
          </div>
          <div className="section-2">
            <div className="content-right">
              {/* Start Title */}
              <CourseTitle
                courseLogo={data[0]?.lecture.course.logo}
                lessonNumber={data[0]?.lecture.order}
                point={10}
              />
              {/* End Title */}
              {/* Start Progress */}
              <div className="progreess">
                <h6>Progress</h6>
                <ProgressBar
                  progress={`${
                    (currentQuestionSequence / sortedQuestions.length) * 100
                  }%`}
                />
                <div className="num">
                  {currentQuestionSequence}/{sortedQuestions.length}
                </div>
              </div>
              {/* End Progress */}
              {/* Start Section Answare */}
              {isCorrect !== null && (
                <div>
                  {isCorrect ? (
                    <h4 style={{ color: "#a3ff12", width: "100%" }}>
                      <img src={correctIcon} width={30} alt="" />
                      Correct
                    </h4>
                  ) : (
                    <div>
                      <h5 style={{ color: "#ff4747", width: "100%" }}>
                        <img src={unCorrectIcon} width={30} alt="" />
                        Incorrect Answer
                      </h5>
                      <h6>Correct Answers:</h6>
                      <ul>
                        {currentQuestion?.answer
                          ?.filter((answer) => answer.is_correct)
                          .map((answer, index) => (
                            <li key={index}>{answer.description}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {isCorrect === null && (
                <>
                  <h5>
                    <div className="qustion-content"
                      dangerouslySetInnerHTML={{
                        __html: currentQuestion?.description,
                      }}
                    />
                  </h5>

                  {currentQuestion?.answer?.map((answer) => (
                    <div className="answare-option" key={answer.id}>
                      <input
                        type="checkbox"
                        id={`option${answer.id}`}
                        checked={selectedAnswers.includes(answer.id)}
                        onChange={() => handleAnswerChange(answer.id)}
                      />
                      <label
                        htmlFor={`option${answer.id}`}
                        className="answare-button"
                      >
                        {answer.description}
                      </label>
                    </div>
                  ))}
                </>
              )}
              {/* End Section Answare */}
              {/* Start Check Button */}
              {isCorrect === null && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "25px",
                  }}
                >
                  <button
                    onClick={handleCheckAnswers}
                    style={{
                      background: "#a3ff12",
                      padding: "5px 25px",
                      fontWeight: "bold",
                    }}
                  >
                    Check
                  </button>
                </div>
              )}

              {/* End Check Button */}
              {/* Start Next Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "70px",
                }}
              >
                <button
                  onClick={handleNextQuestion}
                  style={{
                    background: "#303048",
                    padding: "5px 20px",
                    fontWeight: "800",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                >
                  <h4>Next</h4>
                </button>
              </div>
              {/* End Next Button */}
            </div>
          </div>
        </div>
      </CourseContentWrapper>
    </Fragment>
  );
}
