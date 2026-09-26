import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BoothDetailLayout.css";
import "../styles/SomTalk.css";
import background from "../assets/images/background/somtalkBackground.png";
import backButton from "../assets/images/backbtn.svg";
import refreshButton from "../assets/images/somtalk/refreshBtn.svg";
import defaultButton from "../assets/images/defaultBtn.png";
import selectedButton from "../assets/images/selectedBtn.png";
import searchBox from "../assets/images/searchBtn.png";
import messageBox from "../assets/images/messageBtn.png";
import { SOMTALK_TABS } from "../constants/somtalk.js";

export default function SomTalk() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleRefresh = () => {
    // TODO(API): 선택된 탭의 메시지 목록 다시 불러오기
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // TODO(API): 검색 API 호출
  };

  return (
    <main
      className="booth-detail somtalk-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="booth-detail__inner">
        <header className="booth-detail__header">
          <button
            type="button"
            className="booth-detail__nav booth-detail__nav--back"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <img src={backButton} alt="" />
          </button>

          <h1 className="booth-detail__title">SOM - TALK</h1>

          <button
            type="button"
            className="somtalk-page__refresh"
            onClick={handleRefresh}
            aria-label="새로고침"
          >
            <img src={refreshButton} alt="" />
          </button>
        </header>

        <div className="somtalk-tabs" role="tablist" aria-label="솜톡 카테고리">
          {SOMTALK_TABS.map(({ value, label }) => {
            const isSelected = selectedTab === value;

            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`somtalk-tabs__tab${
                  isSelected ? " somtalk-tabs__tab--selected" : ""
                }`}
                style={{
                  backgroundImage: `url(${
                    isSelected ? selectedButton : defaultButton
                  })`,
                }}
                onClick={() => setSelectedTab(value)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <form className="somtalk-search" role="search" onSubmit={handleSearch}>
          <input
            type="text"
            className="somtalk-search__input"
            style={{ backgroundImage: `url(${searchBox})` }}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="검색어를 입력하세요"
            aria-label="검색어"
            enterKeyHint="search"
          />
          <button
            type="submit"
            className="somtalk-search__button"
            style={{ backgroundImage: `url(${defaultButton})` }}
          >
            검색
          </button>
        </form>

        <section className="somtalk-page__messages" aria-label="메시지 목록">
          {/* 말풍선 목록은 다음 단계에서 추가 */}
        </section>

        <button
          type="button"
          className="somtalk-page__compose"
          style={{ backgroundImage: `url(${messageBox})` }}
        >
          이야기를 나눠보세요
        </button>
      </div>
    </main>
  );
}
