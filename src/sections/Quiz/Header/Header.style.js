import styled from "styled-components";
import headerBg1 from "assets/images/bg/header-shape1.png";
import headerBg2 from "assets/images/bg/header-shape2.png";

const NavWrapper = styled.nav`
  z-index: 999;
  position: relative;
  background: var(--primary-background-color);

  &::before,
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 100%;
    background: url(${headerBg1}) center no-repeat;
    background-size: cover;
    content: "";
    opacity: 0.7;
  }
  &::after {
    left: auto;
    right: 0;
    background: url(${headerBg2}) center no-repeat;
    background-size: cover;
  }

  &.gamfi_header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    transition: all 0.3s;
    z-index: 12;
    padding: 0 50px;

    &.sticky {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(27, 34, 38, 0.8);
      backdrop-filter: blur(15px);
      z-index: 1000;
      margin-top: 0px;
      transition: all 0.2s;
    }
  }
  .logo {
    img {
      width: 100px;
      z-index: 9999;
      position: relative;
    }
  }
`;

export default NavWrapper;
