// 솜네마 페이지 고정 데이터
// 백엔드 없이 프론트에서 직접 관리하는 안내 정보입니다.

import movie1 from "../assets/images/somnema/movie1.png";
import movie2 from "../assets/images/somnema/movie2.png";

// 탭 목록
// width: 피그마 기준 버튼 너비(px)
export const SOMNEMA_TABS = [
  { value: "intro", label: "프로그램소개", width: 113 },
  { value: "movie", label: "상영영화", width: 88 },
  { value: "event", label: "이벤트안내", width: 100 },
  { value: "rental", label: "대여부스안내", width: 113 },
  { value: "notice", label: "유의사항", width: 88 },
];

// 상영 영화 목록 (날짜별)
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
