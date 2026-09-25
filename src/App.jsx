import "./styles/App.css";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <PerformanceTimetable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
