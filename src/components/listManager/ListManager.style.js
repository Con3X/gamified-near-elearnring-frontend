import styled from "styled-components";

const QATypeListStyleWrapper = styled.div`
  padding: 80px 0 50px;
  background: transparent;

  .ranking_list {
    display: block;
    margin: 0;
  }

  .des {
    width: 100%;
    overflow: hidden;
  }
  .ranking_list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    row-gap: 10px;
    padding: 20px 20px !important;
    background: var(--card-background-color);
    backdrop-filter: blur(5px);

    li {
      position: relative;
      display: flex;
      align-items: center;
      height: 35px;
      color: #ffffff;
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 50%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        width: 15%;
      }

      &::before {
        display: none;
        position: absolute;
        left: 0;
        top: -75px;
        content: attr(data-title);
        font-family: "Russo One", sans-serif;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
        text-transform: uppercase;
      }
    }

    &:nth-child(1) {
      li {
        &::before {
          display: block;
        }
      }
    }
  }

  .ranking_list_item + .ranking_list_item {
    margin-top: 10px !important;
  }

  @media only screen and (max-width: 991px) {
    padding-top: 50px;
    .ranking_list {
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      row-gap: 10px;
    }

    .ranking_list_item {
      width: calc(50% - 10px);
      flex-direction: column;
      align-items: flex-end;
      row-gap: 10px;
      margin: 0 !important;

      li {
        width: 100% !important;
        text-align: right;
        justify-content: flex-end;
        &::before {
          top: auto;
          font-size: 14px;
          display: block;
        }
      }
    }

    .ranking_list_item + .ranking_list_item {
      margin-top: 0 !important;
    }
    .des {
      width: 240px;
      overflow: hidden;
    }
  }

  @media only screen and (max-width: 767px) {
    .ranking_list_item {
      width: 100%;
    }
    .des {
      width: 220px;
      overflow: hidden;
    }
  }
  @media only screen and (max-width: 320px) {
    .ranking_list_item {
      li {
        font-size: 11px;
      }
    }
    .des {
      width: 200px;
      overflow: hidden;
    }
  }
`;

export default QATypeListStyleWrapper;
