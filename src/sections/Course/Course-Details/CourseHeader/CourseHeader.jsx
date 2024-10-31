import CourseHeaderStyleWrapper from "./CourseHeader.style";
import ProgressBar from "components/progressBar";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/no-Course.png";
import userDefault from "assets/images/no-User.png";
import { Fragment, useEffect, useState } from "react";
import TotalRating from "components/totalRating/TotalRating";
import CustomPopup from "components/customPopup/CustomPopup";
import Rating from "components/rating/Rating";
import Button from "components/button";

const CourseHeader = ({ data }) => {
  const [course, setCourse] = useState([]);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [showPopup, setShowPopup] = useState();
  const [isNotStartCourse, setIsNotStartCourse] = useState(true);

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

      const isCourseNotStarted = data.every(
        (item) =>
          item?.userLecture[0]?.start_at === null ||
          item?.userLecture[0]?.start_at === undefined ||
          item?.userLecture[0] === undefined
      );
      setIsNotStartCourse(isCourseNotStarted);
    }
  }, [data, course]);

  const handleRatingClick = () => {
    setShowPopup(true);
  };

  return (
    <Fragment>
      <CustomPopup open={showPopup} closed={setShowPopup}>
        <Rating courseId={course?.course?.id} closed={setShowPopup} />
      </CustomPopup>
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
            <div className="total-rating">
              <TotalRating courseId={course?.course?.id} />
            </div>
            <div className="rating-btn">
              {!isNotStartCourse && (
                <Button
                  variant="mint"
                  sm
                  className="banner-btn"
                  onClick={handleRatingClick}
                >
                  Rating
                </Button>
              )}
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
                <h5>Total Prize {totalPrize} points</h5>
                <div className="links">
                  <a href={course?.course?.teacher.discord}>
                    <img src={discordIcon} alt="icon" />{" "}
                  </a>
                  <a href={course?.course?.teacher.twitter}>
                    <img src={twitterIcon} alt="icon" />{" "}
                  </a>
                  <a href={course?.course?.teacher.facebook}>
                    <img src={fbIcon} alt="icon" />{" "}
                  </a>
                  <a href={course?.course?.teacher.linkedin}>
                    <img src={linkedIcon} alt="icon" />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CourseHeaderStyleWrapper>
    </Fragment>
  );
};

export default CourseHeader;
