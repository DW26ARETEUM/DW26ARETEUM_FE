import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import BoothAllPage from "./pages/BoothAllPage.jsx";
import BoothDetailPage from "./pages/BoothDetailPage.jsx";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";
import FoodTruckDetail from "./pages/FoodTruckDetail.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<BoothAllPage />} />

              <Route path="/booths/:boothId" element={<BoothDetailPage />} />

              <Route path="/performance" element={<PerformanceTimetable />} />

              <Route
                path="/performance/:performanceId"
                element={<PerformanceDetail />}
              />

              <Route
                path="/foodtruck/:foodTruckId"
                element={<FoodTruckDetail />}
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
