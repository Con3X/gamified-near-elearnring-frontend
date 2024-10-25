import titleShape from "assets/images/icons/steps.png";
import PageHeaderStyleWrapper from "./PageHeader.style";
import shareIcon from "assets/images/icons/shareIcon.png";
import { Link } from "react-router-dom";

const PageHeader = ({ currentPage, pageTitle, isShowShareIcon }) => {
  return (
    <PageHeaderStyleWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="breadcrumb_area">
              <div className="breadcrumb_menu">
                <>
                  <Link to="/">Home</Link> <span>.</span>{" "}
                  {currentPage && currentPage}
                </>
                <img
                  className="heading_shape"
                  src={titleShape}
                  alt="bithu nft heading shape"
                />
              </div>
              <h2 className="breadcrumb_title text-uppercase">
                {pageTitle && pageTitle}
              </h2>
            </div>
          </div>
          {isShowShareIcon && (
            <div className="col-lg-7">
              <div className="share">
                <Link to="#">
                  <img src={shareIcon} width={20} alt="" />
                  <span>SHARE</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageHeaderStyleWrapper>
  );
};

export default PageHeader;
