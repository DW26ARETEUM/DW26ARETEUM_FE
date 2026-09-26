import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";
import titleLogo from "../assets/images/home/title.png"; // 타이틀 로고 불러오기

export default function Home() {
  const navigate = useNavigate();

  //   임의로 페이지 작성함. 나중에 변경시 수정

  return (
    <div className="home">
      <img className="home-logo" src={titleLogo} alt="Som Thing in the Night" />

      <nav className="menu-container">
        <button
          className="cloud-btn booth-info"
          onClick={() => navigate("/booth-info")}
        >
          부스소개
        </button>
        <button
          className="cloud-btn booth-map"
          onClick={() => navigate("/booth-map")}
        >
          부스배치도
        </button>
        <button
          className="cloud-btn timetable"
          onClick={() => navigate("/timetable")}
        >
          타임테이블
        </button>
        <button
          className="cloud-btn somnema"
          onClick={() => navigate("/somnema")}
        >
          솜네마
        </button>
        <button
          className="cloud-btn som-talk"
          onClick={() => navigate("/som-talk")}
        >
          솜톡
        </button>
        <button
          className="cloud-btn credits"
          onClick={() => navigate("/credits")}
        >
          만든이들
        </button>
      </nav>
    </div>
  );
}
