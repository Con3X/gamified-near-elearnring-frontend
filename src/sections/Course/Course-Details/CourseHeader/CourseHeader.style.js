import styled from "styled-components";
import bgShape from "assets/images/bg/card-bg-shape-big.png";

const CourseHeaderStyleWrapper = styled.section`
  background: #090a1a;

  .cta-area {
    position: relative;
    padding: 150px 0 20px 0;
    background: radial-gradient(circle, #4a4176 -24%, #1e1f35 40%);
    z-index: 1;
    margin-top: 50px;
    width: 80%;
    .card-hover-wrapper {
      opacity: 1;
      visibility: visible;
    }

    &::before {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0%;
      top: 0;
      background: url(${bgShape});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      content: "";
      opacity: 0.8;
      z-index: -1;
    }
  }

  .course-logo {
    position: absolute;
    top: -100px;
    left: calc((100% - 200px) / 2);
    width: 200px;
    height: 200px;
    border-radius: 20px;
  }

  .user-logo {
    position: absolute;
    top: 60px;
    left: calc((100% - 70px) / 2);
    width: 70px;
    height: 70px;
    z-index: 200;
    border-radius: 10px;
    box-shadow: 0 0 3px 0.7px white;
  }

  .title {
    margin-bottom: 15px;
    text-transform: uppercase;
    font-size: 36px;
    line-height: 1.35;
  }

  .dsc {
    margin-bottom: 10px;
  }
  .btn_wrapper {
    margin: 0 auto;
  }

  .footer-course {
    width: 80%;
    margin-left: 10%;
  }

  .course-text {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .links img {
    margin-left: 20px;
  }

  @media only screen and (max-width: 991px) {
    .title {
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 767px) {
    .course-text {
      flex-direction: column;
    }
    .title {
      font-size: 26px;
    }
  }
  @media only screen and (max-width: 480px) {
    .title {
      font-size: 22px;
    }
    .dsc {
      padding: 0 10px;
    }
  }
`;

export default CourseHeaderStyleWrapper;
