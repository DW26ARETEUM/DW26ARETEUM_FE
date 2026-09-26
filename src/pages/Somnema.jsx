import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BoothDetailLayout.css";
import "../styles/Somnema.css";
import background from "../assets/images/background/boothMapBackground.png";
import popup from "../assets/images/boothDetail.png";
import backButton from "../assets/images/backbtn.svg";
import titleLogo from "../assets/images/pinkTitle.png";
import footerImage from "../assets/images/somnema/dwu.png";
import SomnemaTabs from "../components/somnema/SomnemaTabs.jsx";
import SomnemaIntro from "../components/somnema/SomnemaIntro.jsx";
import SomnemaMovies from "../components/somnema/SomnemaMovies.jsx";
import SomnemaEvent from "../components/somnema/SomnemaEvent.jsx";
import SomnemaRental from "../components/somnema/SomnemaRental.jsx";
import SomnemaNotice from "../components/somnema/SomnemaNotice.jsx";
import { SOMNEMA_TABS } from "../constants/somnema.js";

const PANELS = {
  intro: SomnemaIntro,
  movie: SomnemaMovies,
  event: SomnemaEvent,
  rental: SomnemaRental,
  notice: SomnemaNotice,
};

export default function Somnema() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("intro");

  const isShortPopup = SOMNEMA_TABS.find(
    ({ value }) => value === selectedTab,
  )?.shortPopup;
  const Panel = PANELS[selectedTab];

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
          className={`somnema-page__popup${
            isShortPopup ? " somnema-page__popup--short" : ""
          }`}
          style={{ "--popup-image": `url(${popup})` }}
          role="tabpanel"
          aria-labelledby={`somnema-tab-${selectedTab}`}
        >
          <div className="somnema-page__fade" aria-hidden="true" />

          <div className="somnema-page__content">
            <Panel />
          </div>

          <img
            className="somnema-page__logo"
            src={titleLogo}
            alt="S*m Thing in the Night"
          />
        </section>

        <footer className="somnema-page__footer">
          <img src={footerImage} alt="동덕여자대학교" />
        </footer>
      </div>
    </main>
  );
}
