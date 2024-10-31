import styled from "styled-components";

const EditProfileDetailsStyleWrapper = styled.div`
  background: var(--primary-background-color);
  padding-top: 70px;
  padding-bottom: 140px;
  p {
    margin-bottom: 26px;
  }

  .left-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .left-content-butt {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #selector * :not(.css-1u9des2-indicatorSeparator) {
    margin-top: 0px !important;
  }

  .btn-crop {
    position: absolute;
    z-index: 555;
  }

  .left_content_thumb {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(30, 31, 53, 0.7);
    margin-bottom: 30px;
  }

  .edit-profile-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right-content {
    flex: 3;
    display: flex;
  }

  .right-content-section1 {
    flex: 1;
  }

  .right-content-section2 {
    flex: 1;
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

  #selector {
    margin-top: 5px;
  }

  .css-13cymwt-control {
    height: 48px;
  }

  .css-hlgwow {
    height: 48px;
  }

  .css-1wy0on6 {
    height: 48px;
  }

  .css-13cymwt-control {
    width: 90%;
    background: #090b1a;
    border: 2px solid rgba(255, 255, 255, 0.15);
  }

  #react-select-2-placeholder {
    margin-bottom: 10px;
    margin-left: 10px;
  }

  img {
    margin-right: 3px;
    position: relative;
    top: -5px;
  }

  h6 {
    margin-left: 10px;
  }

  .btu {
    margin-left: 300px;
  }

  .btn-file {
    color: red;
  }

  @media only screen and (max-width: 999px) {
    .edit-profile-content {
      flex-direction: column;
    }

    .right-content {
      width: 100%;
    }

    .btu {
      margin-left: 0;
    }

    .left-content {
      flex-direction: row;
      width: 500px;
    }

    .left_content_thumb {
      max-width: 200px !important;
      width: 100%;
      margin-bottom: 40px;
      margin-right: 50px;
    }

    h4 {
      margin-top: 40px;
    }
  }

  @media only screen and (max-width: 820px) {
    .right-content {
      flex-direction: column;
    }
  }
  @media only screen and (max-width: 480px) {
    input {
      width: 100%;
    }
    .left-content {
      flex-direction: column;
      width: 100vw;
    }
    .left_content_thumb {
      margin-right: 0px;
    }
    .css-rrhtqz-control {
      width: 100%;
    }
  }
`;

export default EditProfileDetailsStyleWrapper;
