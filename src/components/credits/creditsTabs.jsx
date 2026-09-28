import defaultButton from "../../assets/images/defaultBtn.png";
import selectedButton from "../../assets/images/selectedBtn.png";

const CreditsTabs = ({ tabs, selectedTab, onChange }) => (
  <nav
    className="credits-tabs"
    aria-label="만든이들 페이지 선택"
    role="tablist"
  >
    {tabs.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        id={`somnema-tab-${value}`}
        role="tab"
        className={`credits-tabs__button${selectedTab === value ? " is-active" : ""}`}
        onClick={() => onChange(value)}
        aria-selected={selectedTab === value}
        aria-controls="somnema-panel"
        style={{
          borderImageSource: `url(${selectedTab === value ? selectedButton : defaultButton})`,
        }}
      >
        {label}
      </button>
    ))}
  </nav>
);

export default CreditsTabs;
