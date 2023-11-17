import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Reservations from "./pages/Reservations";
import ALaCarte from "./pages/ALaCarte";
import LunchMenu from "./pages/LunchMenu";
import Openings from "./pages/Openings";
import Contact from "./pages/Contact";

function App() {
  const activeMenu = true;
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-slate-500 text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed dark:bg-secondary-dark-bg bg-white">
              {" "}
              <Sidebar />{" "}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg"> <Sidebar /> </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? " md:ml-72 " : "flex-2 "
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-dark-bg navbar w-full">
              <Navbar />
            </div>
          </div>

          <div>
            <Routes>
            <Route path="/" element={ <Reservations /> } /> 
              <Route path="/reservations" element={ <Reservations /> } /> 
              <Route path="/lunchMenu" element={ <LunchMenu /> } /> 
              <Route path="/alacarte" element={ <ALaCarte /> } /> 
              <Route path="/openings" element={ <Openings /> } /> 
              <Route path="/contact" element={ <Contact /> } /> 
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
