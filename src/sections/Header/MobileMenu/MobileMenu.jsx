import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import MobileMenuStyleWrapper from "./MobileMenu.style";
import logo from "assets/images/logo-dark.png";
import data from "assets/data/menu/menuData";
import { Link } from "react-router-dom";

const MobileMenu = ({ mobileMenuhandle }) => {
  const [menuId, setMenuId] = useState("");
  const [subMenuId, setSubMenuId] = useState("");

  return (
    <MobileMenuStyleWrapper className="gamfi_mobile_menu">
      <div className="gamfi_mobile_menu_content">
        <div className="mobile_menu_logo">
          <img className="gamfi_logo" src={logo} alt="gamfi logo" />
          <button
            className="mobile_menu_close_btn"
            onClick={() => mobileMenuhandle()}
          >
            {" "}
            <BsXLg />{" "}
          </button>
        </div>
        <div className="gamfi_mobile_menu_list">
          <ul>
            {/* menu  */}
            {data?.map((menu, i) => (
              <li
                key={i}
                // manu expand icon and menu active based on condition
                className={`${menu.subMenus?.length > 0 ? "has_submenu" : ""} ${
                  menuId === menu.id ? "expand_submenu" : ""
                }`}
                onClick={() => setMenuId(menu.id)}
              >
                {menu.action ? (
                  <Link onClick={menu.action}>{menu.title}</Link>
                ) : (
                  <Link to={menu.url}>{menu.title}</Link>
                )}
                {/* if has subMenu and length is greater than 0 */}
                {menu.subMenus?.length > 0 && (
                  <ul className="sub_menu_list">
                    {menu.subMenus?.map((subMenu, i) => (
                      <li
                        key={i}
                        // manu expand icon and menu active based on condition
                        className={`${
                          subMenu?.subMenuChilds?.length > 0
                            ? "sub_has_submenu"
                            : ""
                        } ${
                          subMenuId === subMenu.id ? "expand_submenu_child" : ""
                        }`}
                        onClick={() => setSubMenuId(subMenu.id)}
                      >
                        <Link to href={subMenu.url}>
                          {subMenu.title}
                        </Link>
                        {/* if subMenu child has menu child */}
                        {subMenu?.subMenuChilds?.length > 0 && (
                          <ul className="sub_menu_child_list">
                            {subMenu?.subMenuChilds?.map((subChild, i) => (
                              <li key={i}>
                                <Link to={subChild.url}>
                                  {" "}
                                  {subChild.title}{" "}
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
      </div>
    </MobileMenuStyleWrapper>
  );
};

export default MobileMenu;
