import styled from "styled-components";

const LatestCoursesStyleWrapper = styled.section`
  position: relative;
  padding-top: 188px;
  padding-bottom: 80px;
  background: var(--primary-background-color);
  margin-bottom: 380px;

  .in_preogress_courses_wrapper {
    position: absolute;
    width: 100%;
    height: auto;
    top: -52px;
    z-index: 99;
  }

  @media only screen and (max-width: 991px) {
    padding-top: 465px;
    padding-bottom: 45px;
  }
`

export default LatestCoursesStyleWrapper;