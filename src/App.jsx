import { Navigate, Route, Routes } from "react-router-dom";

import "./styles/App.css";
import Home from "./pages/Home.jsx";
import BoothAllPage from "./pages/BoothAllPage.jsx";
import BoothDetailPage from "./pages/BoothDetailPage.jsx";
import PerformanceTimetable from "./pages/PerformanceTimetable.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";
import FoodTruckDetail from "./pages/FoodTruckDetail.jsx";
import SomCollectionDetail from "./pages/SomCollectionDetail.jsx";
import FestivalBoothDetail from "./pages/FestivalBoothDetail.jsx";
import BarDetail from "./pages/BarDetail.jsx";
import GeneralBoothDetail from "./pages/GeneralBoothDetail.jsx";
import Timetable from "./pages/Timetable.jsx";
import BoothMap from "./pages/BoothMap.jsx";
import Somnema from "./pages/Somnema.jsx";
import SomTalk from "./pages/SomTalk.jsx";
import Credits from "./pages/Credits.jsx";
import Onboarding from "./pages/Onboarding.jsx";

function App() {
  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <Routes>
              {/* 홈 */}
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/" element={<Home />} />

              {/* 부스 소개 메인 */}
              <Route path="/booths" element={<BoothAllPage />} />

              {/* 기존 부스 상세 */}
              <Route path="/booths/:boothId" element={<BoothDetailPage />} />

              {/* 푸드트럭 상세 */}
              <Route
                path="/foodtruck/detail/:day/:boothId"
                element={<FoodTruckDetail />}
              />

              {/* 공연 시간표 */}
              <Route
                path="/performance/timetable"
                element={<PerformanceTimetable />}
              />

              {/* 공연 상세 */}
              <Route
                path="/performance/:performanceId"
                element={<PerformanceDetail />}
              />

              {/* 솜컬렉션 상세 */}
              <Route
                path="/booth/som-collection/:day/:boothId"
                element={<SomCollectionDetail />}
              />

              {/* 축운위 상세 */}
              <Route
                path="/booth/festival/:boothId"
                element={<FestivalBoothDetail />}
              />

              {/* 주점 상세 */}
              <Route path="/booth/bar/:day/:boothId" element={<BarDetail />} />

              {/* 일반 부스 상세 */}
              <Route
                path="/booth/general/:day/:boothId"
                element={<GeneralBoothDetail />}
              />

              {/* 부스 지도 */}
              <Route path="/booth-map" element={<BoothMap />} />
              {/* 솜네마 */}
              <Route path="/somnema" element={<Somnema />} />
              {/* 솜톡 */}
              <Route path="/som-talk" element={<SomTalk />} />
              {/* 타임테이블 */}
              <Route path="/timetable" element={<Timetable />} />
              {/* 만든이들 */}
              <Route path="/credits" element={<Credits />} />

              {/* 존재하지 않는 주소는 홈으로 이동 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
