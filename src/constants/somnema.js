// 솜네마 페이지 고정 데이터

import movie1 from "../assets/images/somnema/movie1.png";
import movie2 from "../assets/images/somnema/movie2.png";

export const SOMNEMA_TABS = [
  { value: "intro", label: "프로그램소개", width: 113 },
  { value: "movie", label: "상영영화", width: 88 },
  { value: "event", label: "이벤트안내", width: 100, shortPopup: true },
  { value: "rental", label: "대여부스안내", width: 113, shortPopup: true },
  { value: "notice", label: "유의사항", width: 88, shortPopup: true },
];

export const SOMNEMA_MOVIES = [
  {
    day: "29",
    label: "9/29",
    title: "대도시의 사랑법",
    year: 2024,
    poster: movie1,
  },
  {
    day: "30",
    label: "9/30",
    title: "만약에 우리",
    year: 2025,
    poster: movie2,
  },
];
