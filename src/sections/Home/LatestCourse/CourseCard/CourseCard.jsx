import { Slider, SliderItem } from "components/slider/Slider";
import ProgressBar from "components/progressBar";
import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/photoDefault.webp";
import userDefault from "assets/images/user.webp";

const data = [
  {
    courseLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727876384594",
    userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
    courseName: "What IS Near",
    courseTitle: "learn near learn near learn near",
    LessonCount: 8,
    LessonEnd: 5,
    totalPrize: 1500,
    linkFacebook: "https://www.facebook.com/Cristiano",
    linkTwitter: "",
    linkDiscord: "",
    linkLinkedin: "",
  },
  {
    courseLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727773253399",
    userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
    courseName: "What IS Near",
    courseTitle: "learn near learn near learn near",
    LessonCount: 8,
    LessonEnd: 3,
    totalPrize: 1500,
    linkFacebook: "https://www.facebook.com/Cristiano",
    linkTwitter: "",
    linkDiscord: "",
    linkLinkedin: "",
  },
];

const CourseCard = () => {
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
        <h2 className="title">In Progress Courses</h2>
        <Slider {...sliderSettings}>
          {data?.map((item, i) => (
            <SliderItem key={i}>
              <div className="game-price-item">
                <div className="game-price-inner">
                  <div className="total-price">
                    <div className="price-inner d-flex mb-45 md-mb-20">
                      <div className="image-icon">
                        <a href="/course-detials">
                          <img
                            src={item.courseLogo || photoDefault}
                            width={180}
                            alt="course logo"
                            onError={(e) => {
                              if (e.target.src !== photoDefault) {
                                e.target.src = photoDefault;
                              }
                            }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="all-raise">
                      Course Progress {item.LessonEnd}/{item.LessonCount}
                    </div>
                  </div>
                  <div className="allocation-max text-center">
                    <img
                      src={item.userLogo || userDefault}
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
                    <h4>{item.courseName}</h4>
                    <h6>{item.courseTitle}</h6>
                  </div>
                </div>
                <div className="progress-inner">
                  <ProgressBar
                    progress={`${(item.LessonEnd * 100) / item.LessonCount}%`}
                  />
                </div>
                <div className="course-text">
                  <h5>Total Prize {item.totalPrize} point</h5>
                  <div className="links">
                    <a href={item.linkDiscord}>
                      <img src={discordIcon} alt="icon" />{" "}
                    </a>
                    <a href={item.linkTwitter}>
                      <img src={twitterIcon} alt="icon" />{" "}
                    </a>
                    <a href={item.linkFacebook}>
                      <img src={fbIcon} alt="icon" />{" "}
                    </a>
                    <a href={item.linkLinkedin}>
                      <img src={linkedIcon} alt="icon" />{" "}
                    </a>
                  </div>
                </div>
                {/* hover */}
                <CardHover />
              </div>
            </SliderItem>
          ))}
        </Slider>
      </div>
    </CourseCardStyleWrapper>
  );
};

export default CourseCard;
