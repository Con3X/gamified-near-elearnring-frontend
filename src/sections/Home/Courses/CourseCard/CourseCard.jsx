import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/photoDefault.webp";
import userDefault from "assets/images/user.webp";

const CourseCard = (props) => {
  return (
    <CourseCardStyleWrapper className="courses_item_wrapper">
      <div className="course-info d-flex">
        <a href={`/course-detials/${props.id}`}>
          <img
            src={props.img || photoDefault}
            width="100%"
            alt="course logo"
            onError={(e) => {
              if (e.target.src !== photoDefault) {
                e.target.src = photoDefault;
              }
            }}
          />
        </a>
        <div className="course-auother">
          <h4 className="mb-10">
            <a href={`/course-detials/${props.id}`}>{props.title}</a>
          </h4>
          <div>{props.name}</div>
        </div>
      </div>
      <div className="course-content">
        <div className="course-header d-flex justify-content-between align-items-center mb-5">
          <div className="heading-title">
            <h4>{props.Difficulty}</h4>
          </div>
          <div className="user-logo">
            <img
              src={props.userLogo || userDefault}
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
        <a href={props.linkDiscord}>
          <img src={discordIcon} alt="icon" />{" "}
        </a>
        <a href={props.linkTwitter}>
          <img src={twitterIcon} alt="icon" />{" "}
        </a>
        <a href={props.linkFacebook}>
          <img src={fbIcon} alt="icon" />{" "}
        </a>
        <a href={props.linkLinkedin}>
          <img src={linkedIcon} alt="icon" />{" "}
        </a>
      </div>

      <CardHover />
    </CourseCardStyleWrapper>
  );
};

export default CourseCard;
