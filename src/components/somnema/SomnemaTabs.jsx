import { useEffect, useRef } from "react";
import defaultButton from "../../assets/images/defaultBtn.png";
import selectedButton from "../../assets/images/selectedBtn.png";
import { SOMNEMA_TABS } from "../../constants/somnema.js";

export default function SomnemaTabs({ selectedTab, onChange }) {
  const containerRef = useRef(null);
  const selectedRef = useRef(null);

  // 선택된 탭이 바뀌면, 그 탭이 가운데 오도록 옆으로 스크롤
  useEffect(() => {
    const container = containerRef.current;
    const selected = selectedRef.current;
    if (!container || !selected) return;

    const left =
      selected.offsetLeft - (container.clientWidth - selected.offsetWidth) / 2;

    container.scrollTo({ left, behavior: "smooth" });
  }, [selectedTab]);

  return (
    <div
      ref={containerRef}
      className="somnema-tabs"
      role="tablist"
      aria-label="솜네마 안내 메뉴"
    >
      {SOMNEMA_TABS.map(({ value, label, width }) => {
        const isSelected = selectedTab === value;

        return (
          <button
            key={value}
            ref={isSelected ? selectedRef : null}
            id={`somnema-tab-${value}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls="somnema-panel"
            className={`somnema-tabs__tab${
              isSelected ? " somnema-tabs__tab--selected" : ""
            }`}
            style={{
              "--tab-width": width,
              borderImageSource: `url(${
                isSelected ? selectedButton : defaultButton
              })`,
            }}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
