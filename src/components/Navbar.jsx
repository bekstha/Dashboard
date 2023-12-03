import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import MenuIcon from "@mui/icons-material/Menu";
import UserProfile from "./UserProfile";
import { useEffect } from "react";

const NavBtn = ({ title, customFunction, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunction}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray text-blue-950"
    >
      <span
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />{" "}
      {icon}{" "}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className="flex justify-between p-2 md:mx-6 relative top-0">
      <NavBtn
        title="Menu"
        customFunction={() =>
          setActiveMenu((prevActiveMenu) => !prevActiveMenu)
        }
        icon={<MenuIcon />}
      />

      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img src="/avatar.png" className="rounded-full h-8 w-8" />
            <p>
              <span>Admin</span>
            </p>
          </div>
        </TooltipComponent>
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
