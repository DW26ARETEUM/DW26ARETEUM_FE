import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PerformanceTimetable.css";
import background from "../assets/images/background/timetableBackground.png";
import backButton from "../assets/images/backbtn.svg";
import homeButton from "../assets/images/homebtn.svg";
import cloudDefault from "../assets/images/cloudDefault.png";
import cloudSelected from "../assets/images/cloudSelected.png";
import line1 from "../assets/images/timetable/line1.svg";
import line2 from "../assets/images/timetable/line2.svg";
import line3 from "../assets/images/timetable/line3.svg";
import line4 from "../assets/images/timetable/line4.svg";
import line5 from "../assets/images/timetable/line5.svg";
import line6 from "../assets/images/timetable/line6.svg";
import line7 from "../assets/images/timetable/line7.svg";
import sparkle from "../assets/images/timetable/sparkle.svg";
import timetableLogo from "../assets/images/timetable/timetableLogo.svg";
import skyline from "../assets/images/timetable/skyline.svg";

// 날짜별 공연 정보를 표시합니다. 추후 API 응답으로 교체할 예정입니다.
const performances = {
  29: [
    { time: "18:05 ~ 18:30", name: "한소리" },
    { time: "18:34 ~ 18:45", name: "김명현" },
    { time: "18:48 ~ 19:03", name: "2003년 6월에 생긴 일" },
    { time: "19:08 ~ 19:25", name: "합정동 평화유지연합회" },
    { time: "19:30 ~ 19:50", name: "전유진" },
    { time: "20:00 ~ 20:30", name: "세이마이네임" },
    { time: "20:35 ~ 21:05", name: "이즈나" },
    { time: "21:10 ~ 21:50", name: "윤하" },
  ],
  30: [
    { time: "18:05 ~ 18:25", name: "소울엔지" },
    { time: "18:30 ~ 18:50", name: "엑스터시" },
    { time: "18:55 ~ 19:15", name: "얼사랑" },
    { time: "19:20 ~ 19:30", name: "오월" },
    { time: "19:30 ~ 19:50", name: "박기영" },
    { time: "20:05 ~ 20:40", name: "체리필터" },
    { time: "20:45 ~ 21:20", name: "청하" },
    { time: "21:25 ~ 22:00", name: "스테이씨" },
  ],
};

// 연결선 이미지를 위에서 아래 순서대로 사용합니다.
const lines = [line1, line2, line3, line4, line5, line6, line7];

// 수정: 날짜별 공연을 표시하고, 선택한 공연의 상세 경로로 이동합니다.
export default function PerformanceTimetable({ onBack, onHome }) {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(29);

  return (
    <main
      className="performance-timetable"
      style={{ backgroundImage: `url(${background})` }}
    >
      <header className="performance-timetable__header">
        <button
          type="button"
          className="performance-timetable__nav performance-timetable__nav--back"
          onClick={onBack ?? (() => navigate(-1))}
          aria-label="뒤로가기"
        >
          <img src={backButton} alt="" />
        </button>

        <h1>공연타임테이블</h1>

        <button
          type="button"
          className="performance-timetable__nav performance-timetable__nav--home"
          onClick={onHome ?? (() => navigate("/"))}
          aria-label="홈으로"
        >
          <img src={homeButton} alt="" />
        </button>
      </header>

      <div className="performance-timetable__days" aria-label="공연 날짜">
        {[29, 30].map((day) => (
          <button
            key={day}
            type="button"
            className={`performance-timetable__day performance-timetable__day--${day}`}
            onClick={() => setSelectedDay(day)}
            aria-pressed={selectedDay === day}
            style={{
              backgroundImage: `url(${
                selectedDay === day ? cloudSelected : cloudDefault
              })`,
            }}
          >
            9/{day}
          </button>
        ))}
      </div>

      <div className="performance-timetable__decorations" aria-hidden="true">
        {lines.map((src, index) => (
          <img
            key={`line-${index}`}
            className={`performance-timetable__line performance-timetable__line--${index + 1}`}
            src={src}
            alt=""
          />
        ))}

        {Array.from({ length: 8 }, (_, index) => (
          <img
            key={`sparkle-${index}`}
            className={`performance-timetable__sparkle performance-timetable__sparkle--${index + 1}`}
            src={sparkle}
            alt=""
          />
        ))}
      </div>

      <ol className="performance-timetable__performances">
        {performances[selectedDay].map(({ time, name }, index) => (
          <li
            key={`${selectedDay}-${time}-${name}`}
            className={`performance-timetable__performance performance-timetable__performance--${index + 1}`}
          >
            {/* 추가: 현재 날짜와 공연 순서를 상세 페이지 주소로 전달합니다. */}
            <button
              type="button"
              className="performance-timetable__performance-button"
              onClick={() => navigate(`/performance/${selectedDay}/${index}`)}
              aria-label={`9월 ${selectedDay}일 ${name} 공연 상세 보기`}
            >
              <span className="performance-timetable__time">{time}</span>
              <span className="performance-timetable__name">{name}</span>
            </button>
          </li>
        ))}
      </ol>

      <img
        className="performance-timetable__logo"
        src={timetableLogo}
        alt="Som Thing in the Night"
      />

      <img
        className="performance-timetable__skyline"
        src={skyline}
        alt=""
        aria-hidden="true"
      />
    </main>
  );
}
