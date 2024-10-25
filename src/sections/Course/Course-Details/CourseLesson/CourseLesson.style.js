import styled from "styled-components";
import itemStripShape from "assets/images/bg/roadmap_strip_shape.svg";

const CourseLessonStyleWrapper = styled.div`
  padding: 100px 0 120px 0;
  background: #090a1a;
  position: relative;

  &::before {
    position: absolute;
    left: 0%;
    top: 0;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 1584px;
    content: "";
  }

  .lesson_row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    row-gap: 30px;
  }

  .lesson_item {
    position: relative;
    overflow: hidden;
    width: 60vw;

    /* corner shape  */
    &::before {
      position: absolute;
      top: -27px;
      width: 50px;
      height: 100px;
      background: #090a1a;
      content: "";
      z-index: 1;
      transform: rotate(150deg);
    }
    &::after {
      position: absolute;
      top: -27px;
      width: 47px;
      height: 75px;
      background: #5d5d69;
      content: "";
      z-index: 2;
      transform: rotate(150deg);
    }

      &::before,
      &::after {
        left: -27px;
        transform: rotate(215deg);
    }

    &.shape_active {
      &::after {
        background: rgba(163, 255, 18, 0.3);
      }
    }

    .lesson_item_inner {
      position: relative;
      padding: 35px 39px 26px 39px;
      background: rgba(30, 31, 53, 0.8);
      overflow: hidden;
      
      &::before {
        position: absolute;
        left: 0;
        bottom: 0;
        background: url(${itemStripShape}) no-repeat;
        width: 100%;
        height: 5px;
        content: "";
      }
    }
  }

  .lesson_title {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .lesson-name{
    font-size: 20px;
    color: white;
  }

  .lesson-small-title{
  color: #bbbbc1;
  }
  .lesson_check_list {
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    li {
      img {
        margin-right: 20px;
      }
    }
  }

  .active{
    color: #a3ff12;
  }

  .arrow-down {
      width: 0;
      height: 0;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-top: 60px solid #2d2c47; 
}

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .lesson_row {
      row-gap: 30px;
      &::before {
        display: none;
      }
  }

  @media only screen and (max-width: 991px) {
    .lesson_row {
      column-gap: 30px;
      row-gap: 30px;
      /* bg arrow shape display none */
      &::before {
        display: none;
      }
    }

    .lesson_item {
      width: 90%;
    }
  }

  @media only screen and (max-width: 767px) {
    .lesson_row {
      flex-direction: row;
      row-gap: 30px;
    }

    .lesson_item {
      width: 100%;
      margin: 0 !important;
    }
  }

  @media only screen and (max-width: 375px) {
    .lesson_check_list {
      li {
        font-size: 12px;

        img {
          margin-right: 10px;
        }
      }
    }
  }
`;

export default CourseLessonStyleWrapper;
