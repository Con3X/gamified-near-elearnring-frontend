import CourseHeaderStyleWrapper from "./CourseHeader.style";
import ProgressBar from "components/progressBar";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import photoDefault from "assets/images/photoDefault.webp";
import userDefault from "assets/images/user.webp";
import { testData } from "./index";
const CourseHeader = () => {
  return (
    <CourseHeaderStyleWrapper>
      <div className="container d-flex justify-content-center">
        <div className="cta-area text-center">
          <div>
            <img
              src={testData.courseLogo || photoDefault}
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
              src={testData.userLogo || userDefault}
              className="user-logo"
              alt="user logo"
              onError={(e) => {
                if (e.target.src !== userDefault) {
                  e.target.src = userDefault;
                }
              }}
            />
          </div>
          <h2 className="title">{testData.courseName}</h2>
          <div className="dsc">{testData.courseTitle}</div>
          <div className="footer-course">
            <div className="course-text">
              <h5>
                Course Progress {testData.LessonEnd}/{testData.LessonCount}
              </h5>
            </div>
            <ProgressBar
              progress={`${(testData.LessonEnd * 100) / testData.LessonCount}%`}
            />
            <div className="course-text">
              <h5>Total Prize {testData.totalPrize} point</h5>
              <div className="links">
                <a href={testData.linkDiscord}>
                  <img src={discordIcon} alt="icon" />{" "}
                </a>
                <a href={testData.linkTwitter}>
                  <img src={twitterIcon} alt="icon" />{" "}
                </a>
                <a href={testData.linkFacebook}>
                  <img src={fbIcon} alt="icon" />{" "}
                </a>
                <a href={testData.linkLinkedin}>
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
