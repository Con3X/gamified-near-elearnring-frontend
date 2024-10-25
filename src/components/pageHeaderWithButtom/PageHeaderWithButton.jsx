import Button from "components/button";
import titleShape from "assets/images/icons/steps.png";
import PageHeaderWithButtonStyleWrapper from "./PageHeaderWithButton.style";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const PageHeader = ({
  currentPage,
  pageTitle,
  buttonName,
  href,
  isShowSearch,
  handelSearch,
}) => {
  return (
    <PageHeaderWithButtonStyleWrapper>
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
          <div className="col-lg-7">
            <div className="breadcrumb_form">
              {isShowSearch && (
                <div className="search">
                  <input
                    type="text"
                    id="Search"
                    name="search"
                    placeholder="Search Course"
                    onChange={handelSearch}
                  />
                  <button>
                    <FiSearch />
                  </button>
                </div>
              )}

              <Button md variant="mint" href={href}>
                {buttonName}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageHeaderWithButtonStyleWrapper>
  );
};

export default PageHeader;
