import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BoothDetailLayout.css";
import background from "../../assets/images/background/home.png";
import popup from "../../assets/images/boothDetail.png";
import backButton from "../../assets/images/backbtn.svg";
import homeButton from "../../assets/images/homebtn.svg";
import BoothDetailTabs from "./BoothDetailTabs.jsx";

export default function BoothDetailLayout({
  heading,
  basicInfo,
  detailInfo,
  defaultTab = "basic",
  onBack,
  onHome,
}) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const handleBack = onBack ?? (() => navigate(-1));
  const handleHome = onHome ?? (() => navigate("/"));
  const headingContent =
    typeof heading === "function" ? heading(selectedTab) : heading;

  return (
    <main
      className="booth-detail"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="booth-detail__inner">
        <header className="booth-detail__header">
          <button
            type="button"
            className="booth-detail__nav booth-detail__nav--back"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <img src={backButton} alt="" />
          </button>

          <h1 className="booth-detail__title">부스상세</h1>

          <button
            type="button"
            className="booth-detail__nav booth-detail__nav--home"
            onClick={handleHome}
            aria-label="홈으로"
          >
            <img src={homeButton} alt="" />
          </button>
        </header>

        <section
          className="booth-detail__popup"
          style={{ backgroundImage: `url(${popup})` }}
          aria-label="부스 상세 정보"
        >
          <div className="booth-detail__heading-area">{headingContent}</div>

          <BoothDetailTabs
            selectedTab={selectedTab}
            onChange={setSelectedTab}
          />

          <div
            id={`booth-detail-panel-${selectedTab}`}
            className="booth-detail__panel"
            role="tabpanel"
            aria-labelledby={`booth-detail-tab-${selectedTab}`}
          >
            {selectedTab === "basic" ? basicInfo : detailInfo}
          </div>
        </section>
      </div>
    </main>
  );
}
