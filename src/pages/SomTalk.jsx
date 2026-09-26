import { useCallback, useEffect, useRef, useState } from "react";
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
import SomTalkMessageList from "../components/somtalk/SomTalkMessageList.jsx";
import SomTalkWriteModal from "../components/somtalk/SomTalkWriteModal.jsx";
import {
  createMessage,
  fetchMessages,
  searchMessages,
} from "../api/somtalk.js";
import { SOMTALK_TABS } from "../constants/somtalk.js";

export default function SomTalk() {
  const navigate = useNavigate();
  const messagesRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [keyword, setKeyword] = useState(""); // 검색창에 입력 중인 글자
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색한 단어
  const [messages, setMessages] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [isWriting, setIsWriting] = useState(false);

  // 탭, 검색어, 새로고침이 바뀌면 목록 다시 불러오기
  useEffect(() => {
    let ignore = false;

    const request = searchKeyword
      ? searchMessages(selectedTab, searchKeyword)
      : fetchMessages(selectedTab);

    request.then((data) => {
      if (!ignore) setMessages(data);
    });

    // 응답이 늦게 와서 다른 결과가 덮어쓰는 것 방지
    return () => {
      ignore = true;
    };
  }, [selectedTab, searchKeyword, reloadCount]);

  // 일반 목록은 최신(맨 아래), 검색 결과는 맨 위부터
  useEffect(() => {
    const list = messagesRef.current;
    if (list) list.scrollTop = searchKeyword ? 0 : list.scrollHeight;
  }, [messages, searchKeyword]);

  const handleRefresh = () => {
    setReloadCount((count) => count + 1);
  };

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    setKeyword(value);

    // TODO(기디): 검색 종료 방법 확정되면 수정 (지금은 검색창을 비우면 목록으로)
    if (!value.trim()) setSearchKeyword("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchKeyword(keyword.trim());
  };

  const closeWriteModal = useCallback(() => setIsWriting(false), []);

  const handleWriteSubmit = async (newMessage) => {
    await createMessage(newMessage);
    setIsWriting(false);
    setReloadCount((count) => count + 1);
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
            onChange={handleKeywordChange}
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

        <section
          ref={messagesRef}
          className="somtalk-page__messages"
          aria-label="메시지 목록"
        >
          {messages && (
            <SomTalkMessageList messages={messages} keyword={searchKeyword} />
          )}
        </section>

        {/* 피그마 기준 검색 결과 화면에서는 입력창 숨김 */}
        {!searchKeyword && (
          <button
            type="button"
            className="somtalk-page__compose"
            style={{ backgroundImage: `url(${messageBox})` }}
            onClick={() => setIsWriting(true)}
          >
            이야기를 나눠보세요
          </button>
        )}
      </div>

      {isWriting && (
        <SomTalkWriteModal
          onClose={closeWriteModal}
          onSubmit={handleWriteSubmit}
        />
      )}
    </main>
  );
}
