import { Slider, SliderItem } from "components/slider/Slider";
import ProgressBar from "components/progressBar";
import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/no-Course.png";
import userDefault from "assets/images/no-User.png";
import { Link } from "react-router-dom";

const CourseCard = ({ data }) => {
  const sliderSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CourseCardStyleWrapper className="in_preogress_courses_wrapper">
      <div className="container">
        <h2 className="title">Courses In Progress</h2>
        <Slider {...sliderSettings}>
          {data?.map((courseDetail, i) => (
            <SliderItem key={i}>
              <Link to={`/course-detials/${courseDetail.course_id}`}>
                <div className="game-price-item">
                  <div className="game-price-inner">
                    <div className="total-price">
                      <div className="price-inner d-flex mb-45 md-mb-20">
                        <div className="image-icon">
                          <img
                            src={courseDetail.course.logo || photoDefault}
                            width={180}
                            alt="course logo"
                            onError={(e) => {
                              if (e.target.src !== photoDefault) {
                                e.target.src = photoDefault;
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="all-raise">
                        Course Progress {courseDetail.endedLecturesCount}/
                        {courseDetail?.course.lecture?.length}
                      </div>
                    </div>
                    <div className="allocation-max text-center">
                      <img
                        src={courseDetail.course.teacher.image || userDefault}
                        width={70}
                        alt="user logo"
                        onError={(e) => {
                          if (e.target.src !== userDefault) {
                            e.target.src = userDefault;
                          }
                        }}
                      />
                      <div className="allocation"></div>
                    </div>
                    <div className="targeted-raise">
                      <h4>{courseDetail.course.name}</h4>
                      <h6>{courseDetail.course.title}</h6>
                    </div>
                  </div>
                  <div className="progress-inner">
                    <ProgressBar
                      progress={`${
                        (courseDetail.endedLecturesCount * 100) /
                        courseDetail?.course.lecture?.length
                      }%`}
                    />
                  </div>
                  <div className="course-text">
                    <h5>Total Prize {courseDetail.totalPoints}</h5>
                    <div className="links">
                      <a href={courseDetail.course.teacher.discord}>
                        <img src={discordIcon} alt="icon" />{" "}
                      </a>
                      <a href={courseDetail.course.teacher.twitter}>
                        <img src={twitterIcon} alt="icon" />{" "}
                      </a>
                      <a href={courseDetail.course.teacher.facebook}>
                        <img src={fbIcon} alt="icon" />{" "}
                      </a>
                      <a href={courseDetail.course.teacher.linkedin}>
                        <img src={linkedIcon} alt="icon" />{" "}
                      </a>
                    </div>
                  </div>
                  <CardHover />
                </div>
              </Link>
            </SliderItem>
          ))}
        </Slider>
      </div>
    </CourseCardStyleWrapper>
  );
};

export default CourseCard;
