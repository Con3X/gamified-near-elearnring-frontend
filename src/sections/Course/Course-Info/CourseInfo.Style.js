import styled from "styled-components";

const CourseInfoStyleWrapper = styled.div`
  background: #090b1a;
  padding-top: 70px;
  padding-bottom: 140px;
  p {
    margin-bottom: 26px;
  }

  input:not(input[type="radio"]) {
    width: 90%;
    margin-bottom: 15px;
    background: transparent;
    outline: none;
    height: 60px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 45px;
    color: rgba(255, 255, 255, 0.5);
    padding: 0px 21px;
    height: 50px;
    border-radius: 10px;
  }

  .course-info {
    display: flex;
  }

  .left-content {
    flex: 1;
  }

  .right-content {
    flex: 1;
  }

  .courseDifficulty {
    display: flex;
    width: 90%;
    border: 2px solid rgba(255, 255, 255, 0.15);
    padding: 10px 20px 0 20px;
    border-radius: 10px;
    margin-bottom: 12px;
  }

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 15px;
    height: 15px;
    border: 2px solid white;
    border-radius: 50%;
    position: relative;
    outline: none;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background-color: white;
    border-color: white;
  }

  input[type="radio"] + label {
    margin-left: 10px;
    margin-bottom: 5px;
    font-weight: 600;
  }

  .course-logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding: 0 50px 0 30px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }

  .course-logo + label {
    font-weight: 600;
  }

  .course-logo img {
    cursor: pointer;
  }

  .discriptionQuill {
    width: 90%;
  }

  .ql-container {
    height: 370px;
  }

  @media only screen and (max-width: 999px) {
    .course-info {
      flex-direction: column;
    }

    .right-content {
      margin-top: 15px;
    }
  }

  @media only screen and (max-width: 480px) {
    .courseDifficulty {
      flex-direction: column;
      width: 100%;
    }
    input:not(input[type="radio"]) {
      width: 100%;
    }
    .course-logo {
      width: 100%;
    }
    .discriptionQuill {
      width: 100%;
    }
  }
`;

export default CourseInfoStyleWrapper;
