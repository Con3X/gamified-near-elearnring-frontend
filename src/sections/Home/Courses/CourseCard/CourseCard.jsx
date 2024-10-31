import titleShape from "assets/images/project/project-heading-image.png";
import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/no-Course.png";
import userDefault from "assets/images/no-User.png";
import { isTokenValid } from "utils/ProviderAuth";
import { Link } from "react-router-dom";
import TotalRating from "components/totalRating/TotalRating";
import { useState } from "react";

const CourseCard = (props) => {
  const [isValid, setIsValid] = useState(null);

  const handleCardClick = async (e) => {
    const checkToken = async () => {
      const valid = await isTokenValid();
      setIsValid(valid);
    };

    checkToken();
    if (isValid !== null && !isValid) {
      e.preventDefault();
    }
  };
  return (
    <CourseCardStyleWrapper className="courses_item_wrapper">
      <Link
        to={`/course-detials/${props.id}`}
        onClick={(e) => handleCardClick(e)}
      >
        <div className="course-info d-flex">
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
          <div className="course-auother">
            <h4>{props.name}</h4>
            <div>{props.title}</div>
            <div className="tag-content">
              <div className="text-content">
                {props.tag ? `#${props.tag}` : null}
              </div>
              {props.tag && <img src={titleShape} alt="shape" />}
            </div>
          </div>
        </div>
        <div className="course-content mb-5">
          <div className="course-header d-flex justify-content-between align-items-center mb-2">
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
          <div>
            <TotalRating courseId={props.id} />
          </div>
        </div>
      </Link>
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
