import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PerformanceTimetable.css";
import { getPerformances, hasPerformanceApi } from "../api/performanceApi.js";
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

// 연결선 이미지를 위에서 아래 순서대로 사용합니다.
const lines = [line1, line2, line3, line4, line5, line6, line7];

// 수정: 선택한 날짜의 공연 목록을 API에서 조회하고 읽기 전용으로 표시합니다.
export default function PerformanceTimetable({ onBack, onHome }) {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(29);

  // 수정: 응답이 어느 날짜의 것인지 함께 저장합니다.
  const [requestResult, setRequestResult] = useState({
    day: null,
    data: [],
    status: "loading",
    message: "",
  });

  useEffect(() => {
    // 추가: 서버 주소를 설정하기 전에는 요청하지 않습니다.
    if (!hasPerformanceApi) return;

    const controller = new AbortController();

    getPerformances(`2026-09-${selectedDay}`, controller.signal)
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("공연 목록 응답 형식이 올바르지 않습니다.");
        }

        if (controller.signal.aborted) return;

        setRequestResult({
          day: selectedDay,
          data,
          status: "success",
          message: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error.name === "AbortError") return;

        setRequestResult({
          day: selectedDay,
          data: [],
          status: "error",
          message: error.message,
        });
      });

    // 추가: 날짜를 바꾸면 이전 날짜의 요청을 취소합니다.
    return () => controller.abort();
  }, [selectedDay]);

  // 추가: 이전 날짜의 응답은 현재 날짜 화면에 표시하지 않습니다.
  const currentResult =
    requestResult.day === selectedDay ? requestResult : null;
  const performances = currentResult?.data ?? [];
  const status = !hasPerformanceApi
    ? "unconfigured"
    : (currentResult?.status ?? "loading");
  const errorMessage = currentResult?.message ?? "";

  return (
    <main
      className={`performance-timetable performance-timetable--${selectedDay}`}
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

      <ol className="performance-timetable__performances" aria-live="polite">
        {status === "unconfigured" ? (
          <li className="performance-timetable__status">
            공연 서버 연결을 준비 중입니다.
          </li>
        ) : status === "loading" ? (
          <li className="performance-timetable__status">
            공연 목록을 불러오는 중입니다.
          </li>
        ) : status === "error" ? (
          <li className="performance-timetable__status">{errorMessage}</li>
        ) : performances.length === 0 ? (
          <li className="performance-timetable__status">
            이 날짜에는 공연이 없습니다.
          </li>
        ) : (
          performances.map((performance, index) => (
            <li
              key={performance.id}
              className={`performance-timetable__performance performance-timetable__performance--${index + 1}`}
            >
              {/* 수정: 공연 항목은 상세로 이동하지 않는 읽기 전용 정보입니다. */}
              <div
                className="performance-timetable__performance-button"
                style={{ cursor: "default" }}
              >
                <span className="performance-timetable__time">
                  {performance.startTime} ~ {performance.endTime}
                </span>
                <span className="performance-timetable__name">
                  {performance.title}
                </span>
              </div>
            </li>
          ))
        )}
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
