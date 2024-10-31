import { useEffect, useState } from "react";
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
import logo from "assets/images/brand/Logo/Without-BG/Logo-5.png";
import connectIcon from "assets/images/icons/connect.png";
import notificationIcon from "assets/images/icons/notification.png";
import personIcon from "assets/images/icons/person.png";
import ngcIcons from "assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentNgcs } from "apiService";
import { isTokenValid } from "utils/ProviderAuth";

const Header = ({ isValid, setIsValid }) => {

  const navigate = useNavigate();

  const [isMobileMenu, setMobileMenu] = useState(false);
  const [points, setPoints] = useState(0);
  const [buttonText, setButtonText] = useState('Connect');

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  useEffect(() => {
    const checkToken = async () => {
      const valid = await isTokenValid(false);
      setIsValid(valid);
    };
    checkToken();
  }, []);

  useEffect(() => {
    const getCurrNgcs = async () => {
      try {
        const result = await getCurrentNgcs();
        if(result) {
          setPoints(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCurrNgcs();
  }, []);

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
              {isValid === true && (
                <ul>
                  {/* menu  */}
                  {data?.map((menu, i) => (
                    <li key={i}>
                      {menu.action ? (
                        <Link onClick={menu.action}>{menu.title}</Link>
                      ) : (
                        <Link to={menu.url}>
                          {menu.title}{" "}
                          {menu.subMenus?.length > 0 && (
                            <MdOutlineKeyboardArrowDown />
                          )}
                        </Link>
                      )}

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
                              {subMenu?.subMenuChilds?.length > 0 && (
                                <ul className="sub_menu_child_list">
                                  {subMenu?.subMenuChilds?.map(
                                    (subChild, i) => (
                                      <li key={i}>
                                        <Link to={subChild.url}>
                                          {subChild.title}
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
              {isValid === true ? (
                <>
                  <button
                    className="menu_btn"
                    onClick={() => handleMobileMenu()}
                  >
                    <MdNotes />
                  </button>
                  <div className="wallet_btn">
                    <img src={ngcIcons} width={25} alt="icon" />
                    {points} NGC
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
                  onClick={() => handleNearLogin(navigate, setButtonText, setIsValid)}
                >
                  <img src={connectIcon} alt="icon" />
                  {buttonText}
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
