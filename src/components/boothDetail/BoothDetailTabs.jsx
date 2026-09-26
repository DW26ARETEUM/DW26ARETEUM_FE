import defaultButton from "../../assets/images/defaultBtn.png";
import selectedButton from "../../assets/images/selectedBtn.png";

const TABS = [
  { value: "basic", label: "기본정보" },
  { value: "detail", label: "세부정보" },
];

export default function BoothDetailTabs({ selectedTab, onChange }) {
  return (
    <div className="booth-detail-tabs" role="tablist" aria-label="부스 정보">
      {TABS.map(({ value, label }) => {
        const isSelected = selectedTab === value;

        return (
          <button
            key={value}
            id={`booth-detail-tab-${value}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`booth-detail-panel-${value}`}
            className="booth-detail-tabs__tab"
            style={{
              backgroundImage: `url(${isSelected ? selectedButton : defaultButton})`,
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
