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
  checkAnswer,
  createStartInCourse,
} from "apiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CourseContent({
  courseId,
  lectureId,
  isNotStartCourse,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionSequence, setCurrentQuestionSequence] = useState(1);

  // Create User Course And Lecture
  useEffect(() => {
    const createStartCourse = async () => {
      try {
        await createStartInCourse(courseId);
      } catch (error) {
        console.error("Error in createStartCourse:", error);
      }
    };

    const createStartUserLecture = async () => {
      try {
        await createStartUserLectureInCourse(courseId, lectureId);
      } catch (error) {
        console.error("Error in createStartUserLecture:", error);
      }
    };

    const initiateCourseAndLecture = async () => {
      if (isNotStartCourse === "true") {
        await createStartCourse();
      }
      await createStartUserLecture();
    };

    initiateCourseAndLecture();
  }, []);

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
  }, []);

  // Sort Qustion According By sequence
  const sortedQuestions = data.sort((a, b) => a.sequence - b.sequence);

  // Get Qustion According By sequence
  const currentQuestion = sortedQuestions.find(
    (question) => question.sequence === currentQuestionSequence
  );

  // Handle Answer Change
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

  const handleCheckAnswers = async () => {
    // Get Correct Answer For Current Qustion
    if (selectedAnswers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select at least one correct answer before submitting.",
      });
      return;
    }
    const qustion = data.filter(
      (qu) => qu.sequence === currentQuestionSequence
    );
    const qustionId = qustion[0].id;
    try {
      const answers = await checkAnswer(
        courseId,
        lectureId,
        qustionId,
        selectedAnswers
      );
      if (!answers.data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${answers.message}`,
        });
      }
      setAnswers(answers);
      const correctAnswers = answers.data.correctAnswers
        .filter((answer) => answer.is_correct)
        .map((answer) => answer.id);

      const isAllCorrect =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((id) => correctAnswers.includes(id));

      setIsCorrect(isAllCorrect);
    } catch (error) {
      console.log(`Error on check answers ${error}`);
    }
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
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "You have successfully completed this lesson. Proceed to the next lesson to continue your progress.",
      });
      navigate(`/course-detials/${courseId}`);
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
                points={10}
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
              {/* Start Section Answer */}
              {isCorrect !== null && (
                <div>
                  {isCorrect ? (
                    <h4 style={{ color: "var(--green-color)", width: "100%" }}>
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
                        {answers?.data.correctAnswers
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
                    <div
                      className="qustion-content"
                      dangerouslySetInnerHTML={{
                        __html: currentQuestion?.description,
                      }}
                    />
                  </h5>

                  {currentQuestion?.answer?.map((answer) =>
                    answer.description.trim() ? (
                      <div className="answer-option" key={answer.id}>
                        <input
                          type="checkbox"
                          id={`option${answer.id}`}
                          checked={selectedAnswers.includes(answer.id)}
                          onChange={() => handleAnswerChange(answer.id)}
                        />
                        <label
                          htmlFor={`option${answer.id}`}
                          className="answer-button"
                        >
                          {answer.description}
                        </label>
                      </div>
                    ) : null
                  )}
                </>
              )}
              {/* End Section Answer */}
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
                      background: "var(--green-color)",
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
                  <h4>Next Question</h4>
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
