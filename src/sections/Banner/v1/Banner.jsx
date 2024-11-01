import BannerStyleWrapper from "./Banner.style";
import bannerIcon from "assets/images/brand/Logo/Without-BG/Logo-6.png";

const Banner = () => {
  return (
    <>
      <BannerStyleWrapper>
        <div className="container">
          <div className="banner-content text-center">
            <img
              width={350}
              src={bannerIcon}
              className="banner-icon"
              alt="banner icon"
            />
            <h1 className="banner-title">
              Gamified e-learning platform
              <br />
              
            </h1>
            <div className="description">
            focusing on NEAR and blockchain agnostic technologies
            </div>
            <div className="description">
              Play to learn & learn to earn
            </div>
          </div>
        </div>
      </BannerStyleWrapper>
    </>
  );
};

export default Banner;
