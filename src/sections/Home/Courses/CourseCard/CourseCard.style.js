import bgShape from "assets/images/bg/shape-bg.png";
import styled from "styled-components";

const CourseCardStyleWrapper = styled.div`
  padding: 30px 30px 10px;
  background: var(--card-background-color);
  transition: all 0.4s;
  position: relative;
  z-index: 2;
  margin-top: 50px;
  overflow: hidden;

  a {
      color: #ffffff;
      text-decoration: none;  
    }

a:hover {
  color: #ffffff;
}
  .course-info {
    margin-bottom: 10px;
    column-gap: 20px;
    

    .course-auother {
      white-space: nowrap;
      overflow: hidden;
      h4 {
        margin-bottom: 10px;
        font-size: 22px;
      }
    }
  }
  .user-logo img {
    border-radius: 5px;
  }
  .course-content {
   margin-bottom: 25px;
    .course-header {
      position: relative;
      

      &::before {
        position: absolute;
        width: 197px;
        height: 35px;
        background: url(${bgShape});
        background-position: center;
        background-repeat: no-repeat;
        left: -70px;
        top: 8px;
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
  .stars-rating{
    font-size: 22px;
  }
  .tag-content {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 8px;
    height: 25.6px;
  }

  .tag-content .text-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rating-div {
    margin-bottom: 10px;
    cursor pointer;
    display: flex;
    justify-content: end;
  }

  .tag-content img {
    position: absolute;
    right: -40px;
  }

  .links {
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 45px;
    bottom: 0;
    left: 0;
  }

  .links a {
    margin-left: 20px;
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
