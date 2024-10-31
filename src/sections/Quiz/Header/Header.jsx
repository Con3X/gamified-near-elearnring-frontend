import { Link } from "react-router-dom";
import NavWrapper from "./Header.style";
import logo from "assets/images/brand/Logo/Without-BG/Logo-5.png";

const Header = () => {
  return (
    <NavWrapper className="gamfi_header" id="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="gamfi nft logo" />
          </Link>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Header;
