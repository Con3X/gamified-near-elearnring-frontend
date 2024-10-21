import bgShape from "assets/images/bg/shape-bg.png";
import styled from "styled-components";

const CourseCardStyleWrapper = styled.div`
  padding: 30px 30px 10px;
  background: rgba(30, 31, 53, 0.8);
  transition: all 0.4s;
  position: relative;
  z-index: 2;

  &::before {
    position: absolute;
    background: rgba(255, 255, 255, 0.05);
    height: 60px;
    width: 100%;
    left: 0px;
    bottom: 0px;
    content: "";
  }

  .course-info {
    margin-bottom: 10px;
    column-gap: 20px;
    a {
      color: #ffffff;
    }

    .course-auother {
      white-space: nowrap;
      overflow: hidden;
      h4 {
        margin-bottom: 10px;
        font-size: 22px;
      }
    }
  }

  .course-content {
    .course-header {
      position: relative;
      margin-bottom: 25px;

      &::before {
        position: absolute;
        width: 197px;
        height: 35px;
        background: url(${bgShape});
        background-position: center;
        background-repeat: no-repeat;
        left: -30px;
        top: 0px;
        content: "";
        z-index: 111;
      }
    }
    .heading-title {
      h4 {
        font-size: 16px;
        margin-bottom: 0;
        margin-top: 7px;
        position: relative;
      }
    }
  }

  .publish-status {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background-image: radial-gradient(
      circle,
      rgba(137, 120, 211, 0.4) 0%,
      #1e1f35 100%
    );

    .card-hover-wrapper {
      opacity: 1;
      visibility: visible;
    }
  }

  @media only screen and (max-width: 1199px) {
    padding-left: 20px;
    padding-right: 20px;

    .course-info {
      .course-auother {
        h4 {
          font-size: 20px;
        }
      }
    }

    .course-content {
      .course-header {
        &::before {
          left: -20px;
        }
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .course-info {
      flex-direction: column;
      row-gap: 20px;
    }
  }
`;

export default CourseCardStyleWrapper;
