import CardHover from "components/cardHover";
import CourseCardStyleWrapper from "./CourseCard.style";
import Button from "components/button";
import photoDefault from "assets/images/photoDefault.webp";

const CourseCard = ({ id, logo, name, title, difficulty, publish_status }) => {
  return (
    <CourseCardStyleWrapper className="teacher_item_wrapper">
      <div className="course-info d-flex">
        <a href={`/show-lesson/${id}`}>
          <img
            src={logo || photoDefault}
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
            <a href={`/show-lesson/${id}`}>{title}</a>
          </h4>
          <div>{name}</div>
        </div>
      </div>

      <div className="course-content">
        <div className="course-header d-flex justify-content-between align-items-center">
          <div className="heading-title">
            <h4>{difficulty}</h4>
          </div>
        </div>
      </div>

      <div className="publish-status">
        {publish_status.toUpperCase() !== "REJECTED" ? (
          <Button variant="mint" sm href={`/course-info/${id}`}>
            Edit
          </Button>
        ) : (
          <h4>{publish_status}</h4>
        )}
      </div>

      <CardHover />
    </CourseCardStyleWrapper>
  );
};

export default CourseCard;
