import bgShape from "assets/images/bg/shape-bg.png";
import styled from "styled-components";

const PlayerCardStyleWrapper = styled.div`
  padding: 30px 30px 10px;
  background: rgba(30, 31, 53, 0.8);
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

  .player-info {
    margin-bottom: 10px;
    column-gap: 20px;
    display: flex;
    justfiy-content: center;
    margin-bottom: 50px;
    a {
      color: #ffffff;
    }

    .player-detail {
      flex: 2;
      white-space: nowrap;
      overflow: hidden;
      h4 {
        margin-bottom: 10px;
        font-size: 22px;
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

  .player-image {
    flex: 1;
    width: 200px;
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

  @media only screen and (max-width: 480px) {
    .player-info {
      flex-direction: column;
      row-gap: 20px;
    }

    .player-image {
      width: 100%;
    }
  }
`;

export default PlayerCardStyleWrapper;
