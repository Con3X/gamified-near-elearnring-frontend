import { useEffect, useState } from "react";
import {
  MdNotes,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import NavWrapper from "./Header.style";
import MobileMenu from "../MobileMenu/MobileMenu";
import data from "assets/data/menu/menuData";
import logo from "assets/images/brand/Logo/Without-BG/Logo-5.png";
import notificationIcon from "assets/images/icons/notification.png";
import personIcon from "assets/images/icons/person.png";
import ngcIcons from "assets/images/brand/Logo/Without-BG/Logo-3-Size/32.png";
import { Link } from "react-router-dom";
import { getCurrentNgcs } from "apiService";
const Header = () => {
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [points, setPoints] = useState(0);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

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
                                {subMenu?.subMenuChilds?.map((subChild, i) => (
                                  <li key={i}>
                                    <Link to={subChild.url}>
                                      {subChild.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="gamfi_menu_btns">
              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>
              <div className="wallet_btn">
                <img src={ngcIcons} width={25} alt="icon" />
                {points} NGC
              </div>
              <img src={notificationIcon} width={35} alt="" />
              <Link to={"/profile"}>
                <img src={personIcon} width={35} alt="" />
              </Link>
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
