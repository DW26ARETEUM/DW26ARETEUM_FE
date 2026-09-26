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
            <FoodTruckDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
