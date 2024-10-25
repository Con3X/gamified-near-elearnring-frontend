import { useState } from "react";
import {
  MdNotes,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { handleNearLogin } from "../../../lib/nearhandler";
import NavWrapper from "./Header.style";
import Button from "components/button";
import MobileMenu from "../MobileMenu/MobileMenu";
import data from "assets/data/menu/menuData";
import logo from "assets/images/logo.png";
import connectIcon from "assets/images/icons/connect.png";
import notificationIcon from "assets/images/icons/notification.png";
import personIcon from "assets/images/icons/person.png";
import treeIcon from "assets/images/icons/tree.png";
import { isTokenValid } from "../../../utils/ProviderAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  return (
    <NavWrapper className="gamfi_header" id="navbar">
      <div className="container">
        {/* Main Menu Start */}
        <div className="gamfi_menu_sect">
          <div className="gamfi_menu_left_sect">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="gamfi nft logo" />
              </Link>
            </div>
          </div>
          <div className="gamfi_menu_right_sect gamfi_v1_menu_right_sect">
            <div className="gamfi_menu_list">
              {isTokenValid(false) === true && (
                <ul>
                  {/* menu  */}
                  {data?.map((menu, i) => (
                    <li key={i}>
                      <Link to={menu.url}>
                        {menu.title}{" "}
                        {menu.subMenus?.length > 0 && (
                          <MdOutlineKeyboardArrowDown />
                        )}
                      </Link>

                      {/* if has subMenu and length is greater than 0 */}
                      {menu.subMenus?.length > 0 && (
                        <ul className="sub_menu_list">
                          {menu.subMenus?.map((subMenu, i) => (
                            <li key={i}>
                              <Link to={subMenu.url}>
                                {subMenu.title}{" "}
                                {subMenu?.subMenuChilds?.length > 0 && (
                                  <MdOutlineKeyboardArrowRight />
                                )}
                              </Link>

                              {/* if subMenu child has menu child */}
                              {subMenu?.subMenuChilds?.length > 0 && (
                                <ul className="sub_menu_child_list">
                                  {subMenu?.subMenuChilds?.map(
                                    (subChild, i) => (
                                      <li key={i}>
                                        <Link to={subChild.url}>
                                          {" "}
                                          {subChild.title}{" "}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="gamfi_menu_btns">
              {isTokenValid(false) === true ? (
                <>
                  <button
                    className="menu_btn"
                    onClick={() => handleMobileMenu()}
                  >
                    <MdNotes />
                  </button>
                  <div className="wallet_btn">
                    <img src={treeIcon} width={25} alt="icon" />
                    150000
                  </div>
                  <img src={notificationIcon} width={35} alt="" />
                  <Link to="/Profile">
                    <img src={personIcon} width={35} alt="" />
                  </Link>
                </>
              ) : (
                <Button
                  id="signMessageBtn"
                  href="# "
                  sm
                  variant="white"
                  className="connect_btn"
                  onClick={handleNearLogin}
                >
                  <img src={connectIcon} alt="icon" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
        {/* <!-- mobile menu --> */}
        {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
      </div>
    </NavWrapper>
  );
};

export default Header;
