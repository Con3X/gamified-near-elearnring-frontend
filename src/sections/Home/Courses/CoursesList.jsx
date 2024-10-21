import React from "react";
import CourseCard from "./CourseCard/CourseCard";
import CoursesListStyleWrapper from "./CoursesList.style";
import { FiSearch } from "react-icons/fi";

export default function CoursesList() {
  const courses = [
    {
      id: 1,
      img: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727876384594",
      userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
      name: "Near protocol near near",
      title: "Learn near protocol learn now",
      Difficulty: "Normal",
      coinIcon: "",
      publishStatus: "Rejected",
      linkFacebook: "https://www.facebook.com/Cristiano",
      linkTwitter: "",
      linkDiscord: "",
      linkLinkedin: "",
    },
    {
      id: 2,
      img: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727773253399",
      userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
      name: "Near2",
      title: "Learn near2",
      Difficulty: "Normal",
      coinIcon: "",
      publishStatus: "Rejected",
      linkFacebook: "https://www.facebook.com/Cristiano",
      linkTwitter: "",
      linkDiscord: "",
      linkLinkedin: "",
    },
    {
      id: 3,
      img: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727773253399",
      userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
      name: "Near",
      title: "Learn near",
      Difficulty: "Normal",
      coinIcon: "",
      publishStatus: "Approved",
      linkFacebook: "https://www.facebook.com/Cristiano",
      linkTwitter: "",
      linkDiscord: "",
      linkLinkedin: "",
    },
    {
      id: 4,
      img: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727773253399",
      userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
      name: "Near",
      title: "Learn near",
      Difficulty: "Normal",
      coinIcon: "",
      publishStatus: "On Review",
      linkFacebook: "https://www.facebook.com/Cristiano",
      linkTwitter: "",
      linkDiscord: "",
      linkLinkedin: "",
    },
    {
      id: 5,
      img: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727773253399",
      userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
      name: "Near",
      title: "Learn near",
      Difficulty: "Normal",
      coinIcon: "",
      publishStatus: "On Review",
      linkFacebook: "https://www.facebook.com/Cristiano",
      linkTwitter: "",
      linkDiscord: "",
      linkLinkedin: "",
    },
    {
      id: 6,
      img: "https://gamify-near.s3.ap-south-1.amazonaws.com/1727773253399",
      userLogo: "https://gamify-near.s3.ap-south-1.amazonaws.com/1728412822003",
      name: "Near",
      title: "Learn near",
      Difficulty: "Normal",
      coinIcon: "",
      publishStatus: "On Review",
      linkFacebook: "https://www.facebook.com/Cristiano",
      linkTwitter: "",
      linkDiscord: "",
      linkLinkedin: "",
    },
  ];

  return (
    <CoursesListStyleWrapper>
      <div className="container">
        <div>
          <div className="breadcrumb_form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                id="Search"
                name="search"
                placeholder="Search Course"
              />
              <button>
                <FiSearch />
              </button>
            </form>
            <div className="btn" onClick={() => {}}>
              Newest
            </div>
            <div className="btn" onClick={() => {}}>
              Biggest Points
            </div>
            <div className="btn" onClick={() => {}}>
              My Courses
            </div>
            <div className="btn" onClick={() => {}}>
              All Courses
            </div>
          </div>
        </div>
        <div className="row">
          {courses.map((filteredCourse, j) => (
            <div key={j} className="col-lg-3 col-md-6">
              <CourseCard {...filteredCourse} />
            </div>
          ))}
        </div>
      </div>
    </CoursesListStyleWrapper>
  );
}
