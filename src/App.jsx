import { Routes, Route } from "react-router-dom";

import "./styles/App.css";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";
import FoodTruckDetail from "./pages/FoodTruckDetail.jsx";
import Home from "./pages/Home.jsx";
import SomCollectionDetail from "./pages/SomCollectionDetail.jsx";
import FestivalBoothDetail from "./pages/FestivalBoothDetail.jsx";
import BarDetail from "./pages/BarDetail.jsx";
import GeneralBoothDetail from "./pages/GeneralBoothDetail.jsx";
import BoothMap from "./pages/BoothMap.jsx";
import Somnema from "./pages/Somnema.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/foodtruck/detail" element={<FoodTruckDetail />} />
              <Route
                path="/performance/timetable"
                element={<PerformanceTimetable />}
              />
              <Route
                path="/performance/:day/:index"
                element={<PerformanceDetail />}
              />
              <Route
                path="/booth/som-collection/:day/:boothId"
                element={<SomCollectionDetail />}
              />
              <Route
                path="/booth/festival/:boothId"
                element={<FestivalBoothDetail />}
              />
              <Route path="/booth/bar/:day/:boothId" element={<BarDetail />} />
              <Route
                path="/booth/general/:day/:boothId"
                element={<GeneralBoothDetail />}
              />
              <Route path="/booth-map" element={<BoothMap />}></Route>
              <Route path="/somnema" element={<Somnema />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
