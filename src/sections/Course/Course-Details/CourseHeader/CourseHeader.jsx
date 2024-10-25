import CourseHeaderStyleWrapper from "./CourseHeader.style";
import ProgressBar from "components/progressBar";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/photoDefault.webp";
import userDefault from "assets/images/user.webp";
import { useEffect, useState } from "react";
const CourseHeader = ({ data }) => {
  const [course, setCourse] = useState([]);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setCourse(data[0]);

      const count = data.reduce((init, lecture) => {
        const isCompleted = lecture.userLecture.some(
          (userLecture) => userLecture.end_at !== null
        );
        return isCompleted ? init + 1 : init;
      }, 0);
      setCompletedLessons(count);

      const sumPrize = data.reduce((init, lecture) => {
        const prize = lecture.question.length * 10;
        return init + prize;
      }, 0);
      setTotalPrize(sumPrize);
    }
  }, [data, course]);

  return (
    <CourseHeaderStyleWrapper>
      <div className="container d-flex justify-content-center">
        <div className="cta-area text-center">
          <div>
            <img
              src={course?.course?.logo || photoDefault}
              className="course-logo"
              alt="course logo"
              onError={(e) => {
                if (e.target.src !== photoDefault) {
                  e.target.src = photoDefault;
                }
              }}
            />
          </div>
          <div>
            <img
              src={course?.course?.teacher.image || userDefault}
              className="user-logo"
              alt="user logo"
              onError={(e) => {
                if (e.target.src !== userDefault) {
                  e.target.src = userDefault;
                }
              }}
            />
          </div>
          <h2 className="title">{course?.course?.name}</h2>
          <div className="dsc">{course?.course?.title}</div>
          <div className="footer-course">
            <div className="course-text">
              <h5>
                Course Progress {completedLessons}/{data?.length}
              </h5>
            </div>
            <ProgressBar
              progress={`
                ${(completedLessons * 100) / data?.length}%`}
            />
            <div className="course-text">
              <h5>Total Prize {totalPrize} point</h5>
              <div className="links">
                <a href={"#"}>
                  <img src={discordIcon} alt="icon" />{" "}
                </a>
                <a href={"#"}>
                  <img src={twitterIcon} alt="icon" />{" "}
                </a>
                <a href={"#"}>
                  <img src={fbIcon} alt="icon" />{" "}
                </a>
                <a href={"#"}>
                  <img src={linkedIcon} alt="icon" />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CourseHeaderStyleWrapper>
  );
};

export default CourseHeader;
