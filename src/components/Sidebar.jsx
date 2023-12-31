import { NavLink } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links } from "../utils/Links";
import { useStateContext } from "../contexts/ContextProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut as firebaseSignOut } from "firebase/auth";
import useSignIn from "../hooks/authHooks";
import { message } from "antd";
import { useMainContext } from "../contexts/MainContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { setActiveTitle, handleLogout } = useMainContext();

  const { loading, error, signOut } = useSignIn();

  const handleNavLinkClick = (linkName) => {
    setActiveTitle(linkName);
    handleCloseSideBar();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleLogout();
      message.success("User signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error.message);
      message.error(error.message);
    }
  };

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-slate-100 text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-slate-500 text-md m-2";

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-blue-950 rounded-r-xl flex">
      {activeMenu && (
        <div>
          <div className="flex justify-center items-center gap-10">
            <NavLink
              to="/lunchMenu"
              exact
              onClick={() => {
                handleNavLinkClick("Lunch Menu");
              }}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-white"
            >
              <FaUtensils />
              <span>Kasthamandap</span>
            </NavLink>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden text-white"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item, index) => (
              <div key={index}>
                <p className="m-3 mt-4 uppercase text-white">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.to}`}
                    key={link.name}
                    onClick={() => handleNavLinkClick(link.name)}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute bottom-5">
            <button
              className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-slate-500 text-md m-2 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogoutIcon />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
