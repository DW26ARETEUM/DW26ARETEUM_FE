import { Routes, Route } from "react-router-dom";

import "./styles/App.css";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";
import FoodTruckDetail from "./pages/FoodTruckDetail.jsx";
import Home from "./pages/Home.jsx";
import SomCollectionDetail from "./pages/SomCollectionDetail.jsx";
import FestivalBoothDetail from "./pages/FestivalBoothDetail.jsx";
import BarDetail from "./pages/BarDetail.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/foodtruck" element={<FoodTruckDetail />} />
              <Route
                path="/booth/som-collection/:day/:boothId"
                element={<SomCollectionDetail />}
              />
              <Route
                path="/booth/festival/:boothId"
                element={<FestivalBoothDetail />}
              />
              <Route path="/booth/bar/:day/:boothId" element={<BarDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
