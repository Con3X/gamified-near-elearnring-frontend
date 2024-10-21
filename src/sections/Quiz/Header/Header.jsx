import NavWrapper from "./Header.style";
import logo from "assets/images/logo.png";

const Header = () => {
  return (
    <NavWrapper className="gamfi_header" id="navbar">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="gamfi nft logo" />
          </a>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Header;
