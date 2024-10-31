import styled from "styled-components";

const CourseContentStyleWrapper = styled.section`
  background: var(--primary-background-color);
  padding-bottom: 100px;

  .main {
    display: flex;
    justify-content: center;
  }

  .content {
    width: 80%;
    border: 1px solid #1a1b2f;
    border-radius: 10px;
    padding: 20px;
  }
`;

export default CourseContentStyleWrapper;
