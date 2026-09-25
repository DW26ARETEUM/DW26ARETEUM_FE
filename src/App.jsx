import "./styles/App.css";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";

function App() {
  // 테스트할 날짜(29 또는 30)와 공연 순서(0~7)를 변경하여 테스트
  const previewDay = 30;
  const previewIndex = 5;

  return (
    <div className="pc-background">
      <div className="mobile-frame">
        <div className="mobile-content">
          <div className="app-content">
            <PerformanceDetail day={previewDay} index={previewIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
