import styled from "styled-components";

const TeacherListStyleWrapper = styled.div`
  background: var(--primary-background-color);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .courses_item_wrapper {
    .course-info {
      flex-direction: column;
      row-gap: 25px;
    }
  }

  .react-tabs {
    position: relative;
  }

  .breadcrumb_form {
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 20px;
    row-gap: 20px;
    padding-top: 50px;
    flex-wrap: wrap;

    .search-div {
      position: relative;

      input,
      button {
        background: transparent;
      }

      input {
        width: 360px;
        padding: 11px 50px 11px 20px;
        color: rgba(255, 255, 255, 0.7);
        border: 1px solid var(--secondary-color);

        &:focus {
          outline: none;
        }
      }

      button {
        height: 100%;
        width: 50px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        right: 0;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.7);
        transform: translate(0, -50%);
        border: none;
      }
    }
  }

  .btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 17px;
    font-family: "Russo One", sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    transition: all 0.4s ease-in-out;
    box-sizing: border-box;
    width: 120px;
    height: 40px;
    border: 2px solid #393941;
    background: transparent;
    z-index: 1;
    color: #ffffff;
    width: 170px;
    height: 50px;
    cursor: pointer;
  }
  }

  @media (max-width: 480px) {
  .breadcrumb_form {
  .search-div {
    width: 100% !important;
      input {
        width: 100% !important;
       }
      }
    }
      .btn {
            width: 47%!important;
            padding: 10px 0;
        }
  }

`;

export default TeacherListStyleWrapper;
