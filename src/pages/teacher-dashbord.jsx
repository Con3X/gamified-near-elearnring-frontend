import { Fragment, useEffect, useState } from "react";
import Layout from "components/layout";
import GlobalStyles from "assets/styles/GlobalStyles";
import Header from "sections/Header/v2";
import PageHeader from "components/pageHeaderWithButtom/PageHeaderWithButton";
import TeacherList from "sections/TeacherDashbord/TeacherList";
import { getAllCourse , getAllCourseByStatus , getUserProfile } from "apiService";

export default function TeacherDashbordPage() {
  const [courses, setCourses] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  /**
   * this function check if user role admin or not , and Connect to the appropriate endpoint, and get course.
   */
  useEffect(() => {
    const fetchCourses = async () => {
      const user = await getUserProfile();
      try {
        let response;
        if ( user.data && user.data.isAdmin) {
          response = await getAllCourseByStatus(); 
        } else {
          response = await getAllCourse(); 
        }
        
        setCourses(response.data);
        setFilterCourse(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  const handelChangeSearch = (e) => {
    const searchVal = e.target.value.toLowerCase();

    const coursesFilter = searchVal
      ? courses.filter(
          (course) =>
            course.name.toLowerCase().includes(searchVal) ||
            course.title.toLowerCase().includes(searchVal) ||
            course.difficulty.toLowerCase().includes(searchVal)
        )
      : courses;
    setFilterCourse(coursesFilter);
  };

  return (
    <Fragment>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader
          currentPage="Teacher Dashbord"
          pageTitle="Teacher Dashbord"
          buttonName="Add Course"
          href={"/course-info"}
          isShowSearch={true}
          handelSearch={handelChangeSearch}
        />
        <TeacherList courses={filterCourse} />
      </Layout>
    </Fragment>
  );
}
