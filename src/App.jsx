import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import BoothAllPage from "./pages/BoothAllPage.jsx";
import BoothDetailPage from "./pages/BoothDetailPage.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<BoothAllPage />} />
              <Route path="/booths/:boothId" element={<BoothDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
