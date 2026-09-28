import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BoothDetailLayout.css";
import "../styles/Somnema.css";
import "../styles/Credits.css";
import background from "../assets/images/background/boothMapBackground.png";
import popup from "../assets/images/boothDetail.png";
import backButton from "../assets/images/backbtn.svg";
import titleLogo from "../assets/images/credits/pinkTitleCredits.png";
import footerImage from "../assets/images/somnema/dwu.png";
import posterImage from "../assets/images/credits/poster.png";
import festivalImage from "../assets/images/credits/festivalIcon.png";
import lionImage from "../assets/images/credits/dwuLionIcon.png";
import dwuLionButton from "../assets/images/credits/dwuLionBtn.png";
import lionButton from "../assets/images/credits/lionBtn.png";
import somImage from "../assets/images/credits/somIcon.png";
import lionPhoto from "../assets/images/credits/lionPhoto.png";
import lionPhotoFrame from "../assets/images/credits/lionPhotoFrame.png";
import CreditsTabs from "../components/credits/creditsTabs.jsx";

const CREDITS_TABS = [
  { value: "areteum", label: "ARETEUM" },
  { value: "team", label: "축운위" },
  { value: "mates", label: "멋사 14기" },
];

const members = {
  design: [
    "김다현|시각디자인",
    "박하은|앙트러프러너십",
    "이시연|문화예술경영",
    "이시원|영어",
    "정다연|문화예술경영",
  ],
  front: [
    "박서연|컴퓨터",
    "성수빈|컴퓨터",
    "송윤서|인문사회문화",
    "유시연|약학",
    "전서빈|정보통계",
    "전채연|컴퓨터",
    "조연지|데이터사이언스",
  ],
  back: [
    "장현지|컴퓨터",
    "이윤진|컴퓨터",
    "이지우|데이터사이언스",
    "임가영|컴퓨터",
    "황세연|컴퓨터",
    "황윤하|컴퓨터",
  ],
};

function CreditsMemberCard({ entry }) {
  const [name, major] = entry.split("|");
  return (
    <div className="credits-member">
      <img className="credits-member__avatar" src={somImage} alt="" />
      <div className="credits-member__name">
        {name}
        <span>{major}</span>
      </div>
    </div>
  );
}

function CreditsAreteum() {
  return (
    <div className="credits-panel credits-panel--event">
      <p className="credits-event__title">동덕여자대학교 2026 ARETEUM</p>
      <img
        src={titleLogo}
        alt="Som Thing in the Night"
        className="credits-event__title-logo"
      />
      <img
        className="credits-event__poster"
        src={posterImage}
        alt="2026 ARETEUM 포스터"
      />
      <div className="credits-event__message">
        <p className="credits-event__message-title">You've got 1 message.</p>
        <p>
          Hey, 솜솜 캠퍼스에 새로운 소문이 돌고
          <br />
          있다는 거 들었어? 가장 반짝이는 밤,
          <br />
          가장 특별한 순간이 기다리고 있대.
        </p>
        <p>
          낮에는 학생으로, 친구로, 각자의 일상을
          <br />
          살아가지만 오늘 밤만큼은 잠시 모든 걸<br />
          내려놓고 친구들과 모여, 음악을 즐기고,
          <br />
          우리의 순간을 기록해봐.
        </p>
        <p>
          누가 올지, 무슨 일이 생길지는 아무도 몰라.
          <br />
          확실한 건 단 하나.
        </p>
        <p>
          오늘 밤, 평범했던 하루가 특별한 밤으로
          <br />
          기억될 거라는 것. <span>SOM-THING in the NIGHT</span>
        </p>
        <p className="credits-event__invite">비밀스런 초대에 응답해줘.</p>
      </div>
      <a
        className="credits-team__button"
        href="https://www.instagram.com/ddwu_festival/"
        target="_blank"
        rel="noreferrer"
      >
        축운위 인스타그램
      </a>
    </div>
  );
}

function CreditsTeam() {
  return (
    <div className="credits-panel credits-panel--committee">
      <p className="credits-panel__title">동덕여자대학교 축제운영위원회</p>
      <div className="credits-committee__seal">
        <img src={festivalImage} alt="동덕여자대학교 축제운영위원회 로고" />
      </div>
      <div className="credits-copy">
        <p>
          동덕여자대학교 <em>축제운영위원회</em>는<br />
          2021년 9월에 설립되어 동덕여자대학교의{" "}
          <em>
            <br />전 재학생을 위한 문화사업
          </em>
          을 기획하고 운영, <br />
          총괄하는 교내 특별기구입니다.
        </p>
        <p>
          축제운영위원회는 설립 이래 <em>‘오솜도솜데이’</em>를<br />
          비롯한 다양한 문화 사업을 전개해 왔습니다.
        </p>
        <p>
          특히 교내 최대 행사인 <em>대동제(ARETEUM)</em>의<br />
          기획부터 실행, 운영 전 과정을 주도하며, 우리
          <br />
          대학만의 특색 있는 축제 문화를 정립하는 데<br />
          중추적인 역할을 수행하고 있습니다.
        </p>
        <p>
          이처럼 축제운영위원회는 다양한 문화 사업을
          <br />
          효율적으로 이끌어가기 위해 <br />
          <em>[기획국, 무대국, 사무국, 행사국, 제작홍보국]</em>
          <br />총 5개의 국서가 상호 간의 협력을 바탕으로
          <br />
          활동하고 있습니다.
        </p>
      </div>
      <a
        className="credits-team__button"
        href="https://www.instagram.com/ddwu_festival/"
        target="_blank"
        rel="noreferrer"
      >
        축운위 인스타그램
      </a>
    </div>
  );
}

function CreditsMates() {
  return (
    <div className="credits-panel credits-panel--mates">
      <p className="credits-panel__title">동덕여자대학교 멋쟁이사자처럼 14기</p>
      <div className="credits-photo-frame">
        <img
          className="credits-photo"
          src={lionPhoto}
          alt="동덕여자대학교 멋쟁이사자처럼 14기 단체 사진"
        />
        <img
          className="credits-photo-frame__overlay"
          src={lionPhotoFrame}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="credits-emblem">
        <img src={lionImage} alt="동덕여자대학교 엠블럼" />
      </div>
      <div className="credits-copy">
        <p>
          <em>멋쟁이사자처럼</em>은<br />
          “비전공자도 웹서비스를 만들 수 있다!”는
          <br />
          슬로건으로 시작된,{" "}
          <em>
            국내 최대 규모의 IT
            <br />
            창업·개발 동아리
          </em>
          입니다.
        </p>
        <p>
          “내 아이디어를 내 손으로 실현한다”는 모토 아래,
          <br />
          누구나 자신만의 서비스를 만들 수 있도록
          <br />
          다양한 스터디와 네트워킹, 실전 프로젝트를
          <br />
          진행합니다.
        </p>
        <p>
          동덕여대 멋쟁이사자처럼 14기는 <br />
          <em>기획/디자인, 프론트엔드, 백엔드</em> 세 파트로
          <br />
          구성되어 여러 프로젝트에서 협업을 통해
          <br />
          함께 성장해나가고 있습니다.
        </p>
        <p>
          이번 축제 페이지도 <em>동덕여대 아기사자</em>들이 직접
          <br />
          디자인하고 개발한 결과물입니다.
        </p>
      </div>
      {[
        ["PLAN & DESIGN", members.design],
        ["FRONT - END", members.front],
        ["BACK - END", members.back],
      ].map(([title, list]) => (
        <section
          className={`credits-section credits-section--${title.startsWith("PLAN") ? "design" : title.startsWith("FRONT") ? "front" : "back"}`}
          key={title}
        >
          <h3>{title}</h3>
          <div className="credits-member-grid">
            {list.map((entry) => (
              <CreditsMemberCard key={entry} entry={entry} />
            ))}
          </div>
        </section>
      ))}
      <div className="credits-team__buttons">
        <a
          className="credits-team__button credits-team__button--university"
          href="https://www.instagram.com/likelion.univ/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={lionButton} alt="" />
          <span>멋사 대학 인스타그램</span>
        </a>
        <a
          className="credits-team__button credits-team__button--dongduk"
          href="https://www.instagram.com/likelion_dongduk/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={dwuLionButton} alt="" />
          <span>동덕 멋사 인스타그램</span>
        </a>
      </div>
    </div>
  );
}

const PANELS = {
  areteum: CreditsAreteum,
  team: CreditsTeam,
  mates: CreditsMates,
};

export default function Credits() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("areteum");
  const Panel = PANELS[selectedTab];
  return (
    <main
      className="booth-detail somnema-page credits-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="booth-detail__inner">
        <header className="booth-detail__header">
          <button
            type="button"
            className="booth-detail__nav booth-detail__nav--back"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <img src={backButton} alt="" />
          </button>
          <h1 className="booth-detail__title">만든이들</h1>
        </header>
        <section
          id="somnema-panel"
          className="somnema-page__popup credits-popup"
          style={{ "--popup-image": `url(${popup})` }}
          role="tabpanel"
          aria-labelledby={`somnema-tab-${selectedTab}`}
        >
          <div className="somnema-page__fade" aria-hidden="true" />
          <CreditsTabs
            tabs={CREDITS_TABS}
            selectedTab={selectedTab}
            onChange={setSelectedTab}
          />
          <div className="somnema-page__content">
            <Panel />
          </div>
          <img
            className="somnema-page__logo"
            src={titleLogo}
            alt="Som Thing in the Night"
          />
        </section>
        <footer className="somnema-page__footer">
          <img src={footerImage} alt="동덕여자대학교" />
        </footer>
      </div>
    </main>
  );
}
