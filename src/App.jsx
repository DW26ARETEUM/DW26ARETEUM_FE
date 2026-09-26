import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";
import FoodTruckDetail from "./pages/FoodTruckDetail.jsx";
import SomCollectionDetail from "./pages/SomCollectionDetail.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<FoodTruckDetail />} />
              <Route
                path="/booth/som-collection/:day/:boothId"
                element={<SomCollectionDetail />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
