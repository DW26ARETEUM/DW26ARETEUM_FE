// 솜네마 - 상영영화 탭 내용
// 영화 정보는 constants/somnema.js 의 SOMNEMA_MOVIES 에서 관리합니다.

import { useState } from "react";
import cloudDefault from "../../assets/images/cloudDefault.png";
import cloudSelected from "../../assets/images/cloudSelected.png";
import { SOMNEMA_MOVIES } from "../../constants/somnema.js";

export default function SomnemaMovies() {
  const [selectedDay, setSelectedDay] = useState(SOMNEMA_MOVIES[0].day);

  const movie =
    SOMNEMA_MOVIES.find(({ day }) => day === selectedDay) ?? SOMNEMA_MOVIES[0];

  return (
    <div className="somnema-movies">
      {/* 날짜 구름 버튼 */}
      <div className="somnema-movies__days" role="group" aria-label="상영 날짜">
        {SOMNEMA_MOVIES.map(({ day, label }) => {
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              className="somnema-movies__day"
              style={{
                backgroundImage: `url(${
                  isSelected ? cloudSelected : cloudDefault
                })`,
              }}
              aria-pressed={isSelected}
              onClick={() => setSelectedDay(day)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 포스터 */}
      <img
        className="somnema-movies__poster"
        src={movie.poster}
        alt={`${movie.title} 포스터`}
      />

      {/* 영화 제목 */}
      <p className="somnema-movies__title">
        {movie.title} ({movie.year})
      </p>
    </div>
  );
}
