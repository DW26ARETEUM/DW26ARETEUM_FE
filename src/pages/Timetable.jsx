import React, { useEffect, useRef, useState } from "react";
import "../styles/Timetable.css";
import BackButton from "../assets/images/backbtn.svg";
import StarIcon from "../assets/images/timetable/sparkle.svg";
import timetableLogo from "../assets/images/timetable/timetableLogo.svg";
import skyline from "../assets/images/timetable/skyline.svg";

export default function Timetable() {
  const timelineRef = useRef(null);
  const starRefs = useRef([]);
  const [starPositions, setStarPositions] = useState([]);
  const [selectedDay, setSelectedDay] = useState("9/29");

  const updateStarPositions = () => {
    if (!timelineRef.current) return;

    const containerRect = timelineRef.current.getBoundingClientRect();

    // 정확히 존재하는 6개의 별 DOM 요소만 순서대로 위치 계산
    const validRefs = starRefs.current.slice(0, 6).filter(Boolean);

    const positions = validRefs.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
        size: rect.width,
      };
    });

    setStarPositions(positions);
  };

  useEffect(() => {
    // DOM 렌더링 직후 및 리사이즈 발생 시 위치 재계산
    updateStarPositions();
    window.addEventListener("resize", updateStarPositions);
    return () => window.removeEventListener("resize", updateStarPositions);
  }, [selectedDay]);

  const getAdjustedLineCoords = (start, end, startGap, endGap) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
      return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
    }

    const ux = dx / distance;
    const uy = dy / distance;

    return {
      x1: start.x + ux * startGap,
      y1: start.y + uy * startGap,
      x2: end.x - ux * endGap,
      y2: end.y - uy * endGap,
    };
  };

  return (
    <div className="timetable">
      <header className="timetable-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <img src={BackButton} alt="뒤로가기" />
        </button>
        <h1>타임테이블</h1>
      </header>

      <main className="timetable-content">
        <nav className="date-tab-container">
          <button
            type="button"
            className={`cloud-tab ${selectedDay === "9/29" ? "active" : ""}`}
            onClick={() => setSelectedDay("9/29")}
          >
            9/29
          </button>
          <button
            type="button"
            className={`cloud-tab ${selectedDay === "9/30" ? "active" : ""}`}
            onClick={() => setSelectedDay("9/30")}
          >
            9/30
          </button>
        </nav>

        <section className="timeline-section" ref={timelineRef}>
          {/* 별 6개를 이어주는 연결선 5개 */}
          <svg className="zigzag-line-svg">
            <defs>
              {/* ⭐️ 선 3 전용 그라데이션 정의 (CSS 변수로 색상 조절 가능) */}
              <linearGradient
                id="lineGradient3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--line3-start-color, #8a2be2)"
                />
                <stop
                  offset="100%"
                  stopColor="var(--line3-end-color, #ff69b4)"
                />
              </linearGradient>
            </defs>

            {starPositions.length === 6 &&
              starPositions.map((pos, index) => {
                if (index === starPositions.length - 1) return null;

                const nextPos = starPositions[index + 1];
                const startGap = pos.size / 2 + 6;
                const endGap = nextPos.size / 2 + 6;

                const { x1, y1, x2, y2 } = getAdjustedLineCoords(
                  pos,
                  nextPos,
                  startGap,
                  endGap,
                );

                const isLine3 = index === 2; // 0:선1, 1:선2, 2:선3

                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={`line-step-${index + 1}`}
                    stroke={isLine3 ? "url(#lineGradient3)" : undefined}
                  />
                );
              })}
          </svg>

          {/* 총 6개의 타임라인 아이템 (왼쪽 -> 오른쪽 순서로 교대) */}
          <div className="timeline-list">
            {/* 별 1 (왼쪽 시작) */}
            <div className="timeline-item left">
              <div
                className="star-wrapper star-step-1"
                ref={(el) => (starRefs.current[0] = el)}
              >
                <div className="star-icon">
                  <img src={StarIcon} alt="별" />
                </div>
              </div>
              <div className="item-text1">
                <p className="item-time">12:00 - 15:00</p>
                <p className="item-title">플리마켓 1타임</p>
              </div>
            </div>

            {/* 별 2 (오른쪽) */}
            <div className="timeline-item right">
              <div
                className="star-wrapper star-step-2"
                ref={(el) => (starRefs.current[1] = el)}
              >
                <div className="star-icon">
                  <img src={StarIcon} alt="별" />
                </div>
              </div>
              <div className="item-text1">
                <p className="item-time">14:00 - 18:00</p>
                <p className="item-title">일반부스</p>
              </div>
            </div>

            {/* 별 3 (왼쪽) */}
            <div className="timeline-item left">
              <div
                className="star-wrapper star-step-3"
                ref={(el) => (starRefs.current[2] = el)}
              >
                <div className="star-icon">
                  <img src={StarIcon} alt="별" />
                </div>
              </div>
              <div className="item-text2">
                <p className="item-time">15:00 - 18:00</p>
                <p className="item-title">플리마켓 2타임</p>
              </div>
            </div>

            {/* 별 4 (오른쪽) */}
            <div className="timeline-item right">
              <div
                className="star-wrapper star-step-4"
                ref={(el) => (starRefs.current[3] = el)}
              >
                <div className="star-icon">
                  <img src={StarIcon} alt="별" />
                </div>
              </div>
              <div className="item-text2">
                <p className="item-time">16:00 - 22:00</p>
                <p className="item-title">주점</p>
              </div>
            </div>

            {/* 별 5 (왼쪽) */}
            <div className="timeline-item left">
              <div
                className="star-wrapper star-step-5"
                ref={(el) => (starRefs.current[4] = el)}
              >
                <div className="star-icon">
                  <img src={StarIcon} alt="별" />
                </div>
              </div>
              <div className="item-text2">
                <p className="item-time">18:00 - 21:00</p>
                <p className="item-title">플리마켓 3타임</p>
              </div>
            </div>

            {/* 별 6 (오른쪽) */}
            <div className="timeline-item right">
              <div
                className="star-wrapper star-step-6"
                ref={(el) => (starRefs.current[5] = el)}
              >
                <div className="star-icon">
                  <img src={StarIcon} alt="별" />
                </div>
              </div>
              <div className="item-text2">
                <p className="item-time">18:00 - 22:00</p>
                <p className="item-title">메인공연</p>
                <p className="item-subtitle">&lt;Som-thing in the night&gt;</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="timetable-footer">
        <div className="notice-pill">
          포토부스는&nbsp;<span className="highlight"> 상시 운영</span>합니다.
        </div>

        <div className="notice-box">
          <p className="notice-title">12:00 - 22:00 운영</p>
          <p className="notice-desc">
            푸드트럭
            <br />
            축제운영위원회 프로그램
            <br />
            &lt;솜네마&gt; &lt;솜칭코&gt; &lt;솜품샵&gt;
            <br />
            &lt;솜솜냠냠&gt; &lt;솜 Pick! 팔찌 메이커&gt;
            <br />
            &lt;솜체크인&gt; &lt;럭키걸 솜드롬&gt;
          </p>
        </div>

        <div className="notice-pill">
          <p className="notice-subtext">
            기재된 시간은 부스 필수 운영 시간이며,
            <br />
            조기 오픈하거나 연장 운영될 수 있습니다.
          </p>
        </div>
      </footer>
      <div className="footer-logo">
        <div className="logo-wrapper">
          <div className="pink-glow-bg" /> {/* 빛 배경 */}
          <img
            className="timetable-logo"
            src={timetableLogo}
            alt="타임테이블 로고"
          />
        </div>
        <img className="dwu" src={skyline} alt="동덕여자대학교" />
      </div>
    </div>
  );
}
