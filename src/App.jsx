import { Routes, Route } from "react-router-dom";

import "./styles/App.css";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";
import FoodTruckDetail from "./pages/FoodTruckDetail.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
