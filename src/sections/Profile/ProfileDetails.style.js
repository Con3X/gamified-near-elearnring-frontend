import styled from "styled-components";

const ProfileDetailsStyleWrapper = styled.div`
  background: #090b1a;
  padding-top: 70px;
  padding-bottom: 140px;
  p {
    margin-bottom: 26px;
  }
    
  .left_content_thumb {
    width: 200px;
    height: 208px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(30, 31, 53, 0.7);
    margin-bottom: 30px;
  }

  .right_content {
    display: flex;
    flex-direction: column;
    justifiy-content: center;
    align-items: center;
  }

  .right_content_title {
    color: #a3ff12 !important;
    font-weight: 400;
    margin: 0;
  }

  .member_title {
    font-size: 30px;
    line-height: 1.4;
    color: #ffffff;
    margin-bottom: 21px;
    text-transform: uppercase;

    span {
      display: block;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 7px;
    }
  }

  .member_details {
    li {
      display: flex;
      font-size: 16px;
      align-items: center;
      margin-top: -10px;
      strong {
        font-family: "Russo One", sans-serif;
        font-style: normal;
        font-weight: 500;
        line-height: 40px;
      }

      span {
        font-family: "Inter";
        line-height: 40px;
        color: #ffffff;
        margin-left: 10px;
      }

      &.social_items {
        a {
          img {
            height: 18px;
            width: 18px;
            margin-left: 15px;
          }
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }

  .img-naer-land {
    margin-top: 20px;
    box-shadow: 0 0 6px 1px white;
  }

  @media only screen and (max-width: 768px) {
    .left_content_thumb {
      max-width: 200px !important;
      width: 100%;
      margin-bottom: 40px;
    }

    .right_content {
      padding: 0 15px 0 0;
    }
  }

  @media only screen and (max-width: 480px) {
    .member_title {
      font-size: 24px;
      span {
        font-size: 17px;
      }
    }

    .member_details {
      li {
        font-size: 14px;
      }
    }
  }
`;

export default ProfileDetailsStyleWrapper;
