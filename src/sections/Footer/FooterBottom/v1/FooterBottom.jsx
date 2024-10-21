import Social from "../../SocialProfile/SocialProfile";
import footerLogo from "assets/images/logo.png";
import { VscChevronUp } from "react-icons/vsc";
import FooterBottomStyleWrapper from "./FooterBottom.style";

const FooterBottom = () => {
  return (
    <FooterBottomStyleWrapper className="footer_bottom_wrapper">
      <Social />
      <div className="container">
        <div className="footer-bottom-content">
          <a href="# " className="footer-logo">
            {" "}
            <img src={footerLogo} alt="footer logo" />{" "}
          </a>

          <div className="scrollup text-center">
            <a href="# ">
              <VscChevronUp />
            </a>
          </div>
        </div>
      </div>
    </FooterBottomStyleWrapper>
  );
};

export default FooterBottom;
