import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { useMainContext } from "../contexts/MainContextProvider";

const NavBtn = ({ title, customFunction, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunction}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray text-blue-950"
    >
      <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />{" "}
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

  const { activeTitle } = useMainContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex gap-5 items-center p-2 md:mx-6 relative top-0">
      <NavBtn
        title="Menu"
        customFunction={() =>
          setActiveMenu((prevActiveMenu) => !prevActiveMenu)
        }
        icon={<MenuIcon />}
      />
      {!activeMenu && (
        <h2 className="px-2 md:text-xl font-extrabold text-blue-950"> {activeTitle.toUpperCase()}</h2>
      )}
    </div>
  );
};

export default Navbar;
