import React, { useState } from "react";

import "../styles/Timetable.css";
import BackButton from "../assets/images/backbtn.svg"; // 뒤로가기 버튼 이미지 불러오기

export default function Timetable() {
  const [selectedDate, setSelectedDate] = useState("0929");

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
            className={`cloud-tab ${selectedDate === "0929" ? "active" : ""}`}
            onClick={() => handleDateChange("0929")}
          >
            9/29
          </button>
          <button
            type="button"
            className={`cloud-tab ${selectedDate === "0930" ? "active" : ""}`}
            onClick={() => handleDateChange("0930")}
          >
            9/30
          </button>
        </nav>
        <section className="timeline-section">
          {/* ... SVG 선 및 시간대별 내용 ... */}
        </section>
      </main>
      <footer className="timetable-footer">{/* 푸터 내용 */}</footer>
    </div>
  );
}
