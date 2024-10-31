import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TeacherListStyleWrapper from "./TeacherList.style";
import CourseCard from "./CourseCard/CourseCard";
import Button from "components/button";

export const teacherTabs = [
  { tabName: "DRAFT" },
  { tabName: "REJECTED" },
  { tabName: "APPROVED" },
];

const TeacherList = (props) => {
  return (
    <TeacherListStyleWrapper>
      <div className="container">
        <div>
        {props.courses.length > 0 ?
          <Tabs>
            <TabList>
              <div className="tab_btn_wrapper">
                {teacherTabs.map((tap, i) => (
                  <Tab key={i}>
                    <button>{tap.tabName} ( { 
                    // TODO: improve to filter once for both here and in the TabPanel below. Or get them categorized already from the backend. 
                      props.courses.filter(
                        (course) =>
                          course.publish_status.toLowerCase() ===
                          tap.tabName.toLowerCase()
                      ).length } )</button>
                  </Tab>
                ))}
              </div>
              <div className="item_sorting_list"></div>
            </TabList>
            {teacherTabs.map((tap, i) => (
              <TabPanel key={i} className="row tabs-row">
                {
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
                }
              </TabPanel>
            ))}
          </Tabs> 
               : (
                <>
                  <p>Start by adding new courses.</p>
                  <p>We will approve high-quality contents.</p>
                </>
              )}
          <br />
          <br />
          <br />
                <Button md variant="mint" 
                  href={`/course-info`}>
                  Add a Course
                </Button>
        </div>
      </div>
    </TeacherListStyleWrapper>
  );
};

export default TeacherList;
