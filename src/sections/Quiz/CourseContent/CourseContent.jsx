import Header from "sections/Quiz/Header";
import { Fragment, useState } from "react";
import CourseContentWrapper from "./CourseContent.style";
import ProgressBar from "components/progressBar";
import CourseTitle from "./CourseTitle/CourseTitle";
import correctIcon from "assets/images/icons/correct.png";
import unCorrectIcon from "assets/images/icons/unCorrect.png";
import { data } from "./index";

export default function CourseContent({ lessonId }) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  // Sort Qustion According By Number
  const sortedQuestions = data.question.sort((a, b) => a.number - b.number);

  // Get Qustion According By Number
  const currentQuestion = sortedQuestions.find(
    (question) => question.number === currentQuestionNumber
  );

  // Handle Answare Change
  const handleAnswerChange = (index) => {
    const currentAnswers = [...selectedAnswers];
    if (currentAnswers.includes(index)) {
      const updatedAnswers = currentAnswers.filter((i) => i !== index);
      setSelectedAnswers(updatedAnswers);
    } else {
      setSelectedAnswers([...currentAnswers, index]);
    }
  };

  const handleCheckAnswers = () => {
    // Get Correct Answare For Current Qustion
    const correctAnswers = currentQuestion.answare
      .map((ans, idx) => (ans.iscorrect ? idx : null))
      .filter((idx) => idx !== null);

    const isAllCorrect =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer));

    setIsCorrect(isAllCorrect);
  };

  const handleNextQuestion = () => {
    setSelectedAnswers([]);
    setIsCorrect(null);

    // Move To Next Qustion
    setCurrentQuestionNumber((prevNumber) =>
      prevNumber < sortedQuestions.length ? prevNumber + 1 : prevNumber
    );

    if (currentQuestionNumber === sortedQuestions.length) {
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
              <div dangerouslySetInnerHTML={{ __html: "" }} />
            </div>
          </div>
          <div className="section-2">
            <div className="content-right">
              {/* Start Title */}
              <CourseTitle
                courseLogo={data.courseLogo}
                lessonNumber={data.lessonNumber}
                point={10}
              />
              {/* End Title */}
              {/* Start Progress */}
              <div className="progreess">
                <h6>Lesson Progress</h6>
                <ProgressBar
                  progress={`${
                    (currentQuestionNumber / sortedQuestions.length) * 100
                  }%`}
                />
                <div className="num">
                  {currentQuestionNumber}/{sortedQuestions.length}
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
                        {currentQuestion.answare
                          .filter((answer) => answer.iscorrect)
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
                  <h5>{currentQuestion.qustion}</h5>
                  {currentQuestion.answare?.map((answer, index) => (
                    <div className="answare-option" key={index}>
                      <input
                        type="checkbox"
                        id={`option${index}`}
                        checked={selectedAnswers.includes(index)}
                        onChange={() => handleAnswerChange(index)}
                      />
                      <label
                        htmlFor={`option${index}`}
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
