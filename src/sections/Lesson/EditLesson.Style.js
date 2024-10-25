import styled from "styled-components";

const EditLessonStyleWrapper = styled.div`
  background: #090b1a;
  padding-top: 70px;
  padding-bottom: 140px;
  p {
    margin-bottom: 26px;
  }

  input {
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

  .edit-lesson {
    display: flex;
  }

  .left-content {
    flex: 6;
  }

  .right-content {
    flex: 7;
  }

  .className {
    padding: 50px;
  }

  .discriptionQuill {
    width: 90%;
    margin-bottom: 15px;
  }

  .ql-container {
    min-height: 200px;
  }

  select {
    padding: 20px;
    width: 50%;
    background-color: transparent;
    border: 0px solid transparent;
    background-color: #232230;
    color: white;
    font-weight: 600;
  }

  @media only screen and (max-width: 999px) {
    .edit-lesson {
      flex-direction: column;
    }

    .right-content {
      margin-top: 15px;
    }
  }
  @media only screen and (max-width: 999px) {
    .discriptionQuill {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
`;

export default EditLessonStyleWrapper;
