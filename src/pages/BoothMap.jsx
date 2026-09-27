import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BoothMap.css";
import background from "../assets/images/background/boothMapBackground.png";
import backButton from "../assets/images/backbtn.svg";
import cloudDefault from "../assets/images/cloudDefault.png";
import cloudSelected from "../assets/images/cloudSelected.png";
import FilterButton from "../components/boothMap/FilterButton.jsx";
import { BOOTH_LIST, CATEGORIES, DAYS } from "../constants/boothMap.js";

export default function BoothMap() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [categoryKey, setCategoryKey] = useState("all");
  const [slideIndex, setSlideIndex] = useState(0);

  const category = CATEGORIES.find(({ key }) => key === categoryKey);
  const booths = BOOTH_LIST[categoryKey]?.[selectedDay] ?? [];

  const moveToSlide = (index, behavior = "smooth") => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollTo({ left: slider.clientWidth * index, behavior });
    setSlideIndex(index);
  };

  // 카테고리 변경 시 해당 구역 지도로 이동
  const selectCategory = (next) => {
    setCategoryKey(next.key);
    moveToSlide(next.initialSlide ?? 0);
  };

  const handleScroll = (event) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    setSlideIndex(Math.round(scrollLeft / clientWidth));
  };

  return (
    <main
      className="booth-map-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* 헤더 */}
      <header className="booth-map__header">
        <button
          type="button"
          className="booth-map__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <img src={backButton} alt="" />
        </button>
        <h1>부스배치도</h1>
      </header>

      {/* 날짜 탭 */}
      <nav className="booth-map__days" aria-label="날짜 선택">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              className={`booth-map__day${isSelected ? " booth-map__day--selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedDay(day)}
              style={{
                backgroundImage: `url(${isSelected ? cloudSelected : cloudDefault})`,
              }}
            >
              9/{day}
            </button>
          );
        })}
      </nav>

      {/* 지도 슬라이더 */}
      <section className="booth-map__slider-wrap" aria-label="부스 지도">
        <div
          ref={sliderRef}
          className="booth-map__slider"
          onScroll={handleScroll}
        >
          {category.maps.map((src, index) => (
            <img
              key={src}
              className="booth-map__map pixel-art"
              src={src}
              alt={`${category.label} 부스 지도 ${index + 1}`}
              draggable={false}
            />
          ))}
        </div>

        <div className="booth-map__dots">
          {category.maps.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`booth-map__dot${slideIndex === index ? " booth-map__dot--active" : ""}`}
              aria-label={`지도 ${index + 1} 보기`}
              aria-current={slideIndex === index}
              onClick={() => moveToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* 카테고리 필터 + 부스 목록 */}
      <section
        className={`booth-map__panel${booths.length ? " booth-map__panel--list" : ""}`}
      >
        <div className="booth-map__filters">
          {CATEGORIES.map((item) => (
            <FilterButton
              key={item.key}
              label={item.label}
              selected={categoryKey === item.key}
              onClick={() => selectCategory(item)}
            />
          ))}
        </div>

        {booths.length > 0 && (
          <ol className="booth-map__list">
            {booths.map((name, index) => (
              <li key={`${selectedDay}-${name}`}>
                <button
                  type="button"
                  className="booth-map__item"
                  onClick={() =>
                    navigate(category.getPath(selectedDay, index + 1))
                  }
                >
                  <span className="booth-map__number">{index + 1}</span>
                  <span className="booth-map__name">{name}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
