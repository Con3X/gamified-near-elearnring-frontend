import styled from "styled-components";
import bgShape from "assets/images/bg/card-bg-shape-big.png";

const CourseHeaderStyleWrapper = styled.section`
  background: var(--primary-background-color);

  .cta-area {
    position: relative;
    padding: 150px 0 20px 0;
    background: var(--card-background-color);
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

  .total-rating {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .rating-btn {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .stars-rating {
    font-size: 20px;
  }

  .count-rating {
    font-size: 16px;
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
    .total-rating {
      position: relative;
      top: 0px;
      right: 0px;
    }
    .rating-btn {
      position: relative;
      top: 0px;
      left: 0px;
      margin: 10px 0;
    }
  }
  @media only screen and (max-width: 480px) {
    .title {
      font-size: 22px;
    }
    .dsc {
      padding: 0 10px;
    }
    .total-rating {
      position: relative;
      top: 0px;
      right: 0px;
    }
    .rating-btn {
      position: relative;
      top: 0px;
      left: 0px;
      margin: 10px 0;
    }
  }
`;

export default CourseHeaderStyleWrapper;
