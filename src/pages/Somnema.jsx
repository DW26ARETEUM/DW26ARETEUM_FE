import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BoothDetailLayout.css";
import "../styles/Somnema.css";
import background from "../assets/images/background/home.png";
import popup from "../assets/images/boothDetail.png";
import backButton from "../assets/images/backbtn.svg";
import SomnemaTabs from "../components/somnema/SomnemaTabs.jsx";
import { SOMNEMA_TABS } from "../constants/somnema.js";

export default function Somnema() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("intro");

  const selectedLabel = SOMNEMA_TABS.find(
    ({ value }) => value === selectedTab,
  )?.label;

  return (
    <main
      className="booth-detail somnema-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="booth-detail__inner">
        <header className="booth-detail__header">
          <button
            type="button"
            className="booth-detail__nav booth-detail__nav--back"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <img src={backButton} alt="" />
          </button>

          <h1 className="booth-detail__title">솜네마</h1>
        </header>

        <SomnemaTabs selectedTab={selectedTab} onChange={setSelectedTab} />

        <section
          id="somnema-panel"
          className="somnema-page__popup"
          style={{ backgroundImage: `url(${popup})` }}
          role="tabpanel"
          aria-labelledby={`somnema-tab-${selectedTab}`}
        >
          {/* 탭별 내용은 다음 단계에서 채울 예정 */}
          <p>{selectedLabel} 준비 중</p>
        </section>
      </div>
    </main>
  );
}
