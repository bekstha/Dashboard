import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Reservations from "./pages/Reservations";
import ALaCarte from "./pages/ALaCarte";
import LunchMenu from "./pages/LunchMenu";
import Openings from "./pages/Openings";
import Contact from "./pages/Contact";
import { useStateContext } from "./contexts/ContextProvider";
import SpecialMenu from "./pages/SpecialMenu";

function App() {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              {" "}
              <Sidebar />{" "}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              {" "}
              <Sidebar />{" "}
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="sticky top-0 bg-main-bg dark:bg-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div className="p-4">
              <Routes>
                <Route path="/" element={<LunchMenu />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/lunchMenu" element={<LunchMenu />} />
                <Route path="/alacarte" element={<ALaCarte />} />
                <Route path="/openings" element={<Openings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/specialMenu" element={<SpecialMenu />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
