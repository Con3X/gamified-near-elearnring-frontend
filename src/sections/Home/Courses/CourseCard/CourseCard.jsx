import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/photoDefault.webp";
import userDefault from "assets/images/user.webp";
import { isTokenValid } from "utils/ProviderAuth";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
  const handleCardClick = (e) => {
    if (!isTokenValid()) {
      e.preventDefault();
    }
  };
  return (
    <CourseCardStyleWrapper className="courses_item_wrapper">
      <div className="course-info d-flex">
        <Link
          to={`/course-detials/${props.id}`}
          onClick={(e) => handleCardClick(e)}
        >
          <img
            src={props.logo || photoDefault}
            width="100%"
            alt="course logo"
            onError={(e) => {
              if (e.target.src !== photoDefault) {
                e.target.src = photoDefault;
              }
            }}
          />
        </Link>
        <div className="course-auother">
          <h4 className="mb-10">
            <Link
              to={`/course-detials/${props.id}`}
              onClick={(e) => handleCardClick(e)}
            >
              {props.name}
            </Link>
          </h4>
          <div>{props.title}</div>
        </div>
      </div>
      <div className="course-content">
        <div className="course-header d-flex justify-content-between align-items-center mb-5">
          <div className="heading-title">
            <h4>{props.difficulty}</h4>
          </div>
          <div className="user-logo">
            <img
              src={props.teacher.image || userDefault}
              width={45}
              alt="user logo"
              onError={(e) => {
                if (e.target.src !== userDefault) {
                  e.target.src = userDefault;
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="links">
        <a href={props.teacher.discord}>
          <img src={discordIcon} alt="icon" />{" "}
        </a>
        <a href={props.teacher.twitter}>
          <img src={twitterIcon} alt="icon" />{" "}
        </a>
        <a href={props.teacher.facebook}>
          <img src={fbIcon} alt="icon" />{" "}
        </a>
        <a href={props.teacher.linkedin}>
          <img src={linkedIcon} alt="icon" />{" "}
        </a>
      </div>

      <CardHover />
    </CourseCardStyleWrapper>
  );
};

export default CourseCard;
