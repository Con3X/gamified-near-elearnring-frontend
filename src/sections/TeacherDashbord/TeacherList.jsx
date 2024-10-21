import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TeacherListStyleWrapper from "./TeacherList.style";
import CourseCard from "./CourseCard/CourseCard";

export const teacherTabs = [
  { tabName: "APPROVED" },
  { tabName: "DRAFT" },
  { tabName: "REJECTED" },
];

const TeacherList = (props) => {
  return (
    <TeacherListStyleWrapper>
      <div className="container">
        <div>
          <Tabs>
            <TabList>
              <div className="tab_btn_wrapper">
                {teacherTabs.map((tap, i) => (
                  <Tab key={i}>
                    <button>{tap.tabName}</button>
                  </Tab>
                ))}
              </div>
              <div className="item_sorting_list"></div>
            </TabList>
            {teacherTabs.map((tap, i) => (
              <TabPanel key={i} className="row tabs-row">
                {props.courses.length > 0 ? (
                  props.courses
                    .filter(
                      (course) =>
                        course.publish_status.toLowerCase() ===
                        tap.tabName.toLowerCase()
                    )
                    .map((filteredCourse, j) => (
                      <div key={j} className="col-lg-3 col-md-6">
                        <CourseCard {...filteredCourse} />
                      </div>
                    ))
                ) : (
                  <p>No courses available</p>
                )}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </TeacherListStyleWrapper>
  );
};

export default TeacherList;
