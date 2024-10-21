import styled from "styled-components";

const TeacherListStyleWrapper = styled.div`
  background: #090a1a;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-top: 380px;

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

    form {
      position: relative;

      input,
      button {
        background: transparent;
      }

      input {
        width: 380px;
        padding: 11px 50px 11px 20px;
        color: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.3);

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
  .tabs-row {
    row-gap: 30px;
    transition: all 0.4s;
  }

  .react-tabs__tab-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: -105px;
    left: 0;
    width: 100%;
    height: auto;
    background: #222231;
    margin-bottom: 42px;
  }

  .tab_btn_wrapper {
    display: flex;
    align-items: center;
  }

  .item_sorting_list button,
  .react-tabs__tab button {
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    font-family: "Russo One", sans-serif;
    position: relative;
    text-transform: uppercase;
    padding: 18px 28px;
    transition: all 0.4s;

    &:hover {
      color: #ffffff;
    }
  }

  .react-tabs__tab {
    border-right: 1px solid rgba(255, 255, 255, 0.08);

    position: relative;

    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background: #6d4afe;
      content: "";
      transition: 0.4s ease-in-out;
    }

    &.react-tabs__tab--selected {
      &::before {
        width: 100%;
      }
    }
  }

  .item_sorting_list {
    display: flex;
    align-items: center;
    button {
      position: relative;
      font-family: "inter", sans-serif;
      text-transform: capitalize;
      position: relative;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      padding: 18px 40px;
      display: flex;
      align-items: center;
      column-gap: 20px;
      img {
        height: 14px;
        width: 14px;
        transition: all 0.3s;
      }
      &:hover {
        .sub-menu {
          display: block;
          top: 59px;
        }
        img {
          transform: rotate(180deg);
        }
      }
      .sub-menu {
        transition: all 0.4s;
        display: none;
        position: absolute;
        top: 45px;
        left: 0;
        z-index: 1111;
        background: #222231;
        width: 100%;
        li {
          display: flex;
          align-items: center;
          font-size: 90%;
          column-gap: 5px;
          padding: 18px 28px;
          transition: all 0.4s;
          &:hover {
            color: #ffffff;
          }

          img {
            width: 20px;
            height: 20px;
          }
        }
        li + li {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .react-tabs__tab {
      font-size: 14px;
      button {
        padding: 17px 12px;
      }
    }

    .item_sorting_list {
      button {
        padding: 17px 30px;
        font-size: 14px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    padding-top: 200px;
    .react-tabs__tab-list {
      flex-direction: column;
      align-items: flex-start;
      top: -170px;
    }

    .tab_btn_wrapper {
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .react-tabs__tab {
      width: 33.33%;
      border: none;
    }

    .item_sorting_list {
      width: 100%;
      button {
        width: 50%;
        border: none;
        justify-content: space-between;
      }

      button + button {
        border-left: 1px solid rgba(255, 255, 255, 0.08);
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .item_sorting_list {
      button {
        padding: 17px 19px;
        font-size: 13px;
      }
    }
  }
`;

export default TeacherListStyleWrapper;
