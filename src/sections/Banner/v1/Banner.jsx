import BannerStyleWrapper from "./Banner.style";
import bannerIcon from "assets/images/icons/icon1.png";

const Banner = () => {
  return (
    <>
      <BannerStyleWrapper>
        <div className="container">
          <div className="banner-content text-center">
            <img src={bannerIcon} className="banner-icon" alt="banner icon" />
            <h1 className="banner-title">
              Gather The Course,
              <br /> Build Your Land
            </h1>
            <div className="description">
              Gamfi Land Blockchain-agnostic Learn Platform
            </div>
          </div>
        </div>
      </BannerStyleWrapper>
    </>
  );
};

export default Banner;
