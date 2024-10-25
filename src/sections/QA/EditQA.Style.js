import styled from "styled-components";

const EdirQAStyleWrapper = styled.div`
  background: #090b1a;
  padding-top: 70px;
  padding-bottom: 140px;
  p {
    margin-bottom: 26px;
  }

  input:not(input[type="checkbox"]) {
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

  input[type="checkbox"] {
    width: 25px;
    margin-bottom: 17px;
    margin-right: 15px;
  }

  .discriptionQuill {
    width: 90%;
  }
  .ql-container {
    height: 175px;
  }

  .edit-lesson {
    display: flex;
  }

  .left-content {
    flex: 1;
  }

  .right-content {
    flex: 1;
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
  
  }
`;

export default EdirQAStyleWrapper;
