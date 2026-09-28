import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  CHAT_MESSAGE_EVENT,
  CHAT_STREAM_URL,
  SOMTALK_PAGE_SIZE,
  createMessage,
  fetchMessages,
  fetchNewerMessages,
  fetchOlderMessages,
  searchMessages,
} from "../api/somtalk.js";
import { SOMTALK_EMPTY_TEXT, SOMTALK_TABS } from "../constants/somtalk.js";
import { getClientId } from "../utils/clientId.js";

// 맨 아래에서 이 정도(px) 안쪽이면 "맨 아래 보는 중"으로 판단
const BOTTOM_THRESHOLD = 80;
// 맨 위에서 이 정도(px) 안쪽이면 옛날 글 불러오기
const TOP_THRESHOLD = 40;

// 지금까지 받은 메시지 중 가장 큰 messageId 기억 (SSE 재연결 복구 기준)
const rememberLastId = (lastIdRef, list) => {
  list.forEach(({ messageId }) => {
    if (messageId > (lastIdRef.current ?? 0)) lastIdRef.current = messageId;
  });
};

export default function SomTalk() {
  const navigate = useNavigate();
  const messagesRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [keyword, setKeyword] = useState(""); // 검색창에 입력 중인 글자
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색한 단어
  const [messages, setMessages] = useState(null);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(false); // 옛날 글이 더 있는지
  const [reloadCount, setReloadCount] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  // 내 글 등록 후 무조건 맨 아래로 보내는 신호
  const [scrollToBottomCount, setScrollToBottomCount] = useState(0);

  // SSE 이벤트 안에서 "지금 보는 탭/검색어"를 알기 위한 값
  const viewRef = useRef({ tab: "all", keyword: "" });
  // 가장 최근에 받은 messageId
  const lastMessageIdRef = useRef(null);
  // 목록이 바뀐 뒤 맨 아래로 내릴지 여부
  const stickToBottomRef = useRef(true);
  // 옛날 글 불러오는 중인지 (중복 요청 방지)
  const isLoadingOlderRef = useRef(false);
  // 옛날 글 붙이기 전 스크롤 위치 (읽던 곳 유지용)
  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    viewRef.current = { tab: selectedTab, keyword: searchKeyword };
  }, [selectedTab, searchKeyword]);

  // 탭, 검색어, 새로고침이 바뀌면 목록 다시 불러오기
  useEffect(() => {
    // 탭을 빨리 바꾸면 이전 요청은 취소
    const controller = new AbortController();

    const request = searchKeyword
      ? searchMessages(selectedTab, searchKeyword, controller.signal)
      : fetchMessages(selectedTab, controller.signal);

    request
      .then((data) => {
        if (!searchKeyword) rememberLastId(lastMessageIdRef, data);
        stickToBottomRef.current = true;
        scrollAnchorRef.current = null;
        setMessages(data);
        // 꽉 차게 왔으면 옛날 글이 더 있을 수 있음 (검색은 제외)
        setHasMoreOlder(!searchKeyword && data.length === SOMTALK_PAGE_SIZE);
        setHasLoadError(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setHasLoadError(true);
      });

    return () => controller.abort();
  }, [selectedTab, searchKeyword, reloadCount]);

  // 목록이 바뀌면 스크롤 위치 맞추기 (화면 그리기 직전에 해서 깜빡임 방지)
  useLayoutEffect(() => {
    const list = messagesRef.current;
    if (!list) return;

    // 옛날 글을 위에 붙였으면 읽던 곳 그대로 유지
    if (scrollAnchorRef.current) {
      const { height, top } = scrollAnchorRef.current;
      list.scrollTop = list.scrollHeight - height + top;
      scrollAnchorRef.current = null;
      return;
    }

    // 일반 목록은 최신(맨 아래), 검색 결과는 맨 위부터
    if (searchKeyword) {
      list.scrollTop = 0;
    } else if (stickToBottomRef.current) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages, searchKeyword, scrollToBottomCount]);

  // 새 메시지를 목록 맨 아래에 추가 (SSE, 재연결 복구, 내 글 등록에서 사용)
  const appendMessages = useCallback((newMessages) => {
    rememberLastId(lastMessageIdRef, newMessages);

    const { tab, keyword: currentKeyword } = viewRef.current;

    // 검색 결과 보는 중에는 섞이지 않게 추가 안 함
    if (currentKeyword) return;

    // 지금 탭에 맞는 글만
    const visibleMessages = newMessages.filter(
      ({ category }) => tab === "all" || category === tab,
    );
    if (visibleMessages.length === 0) return;

    // 맨 아래 보는 중이었거나 내 글이면 새 글 따라 내려가기
    const list = messagesRef.current;
    const isNearBottom =
      !list || list.scrollHeight - list.scrollTop - list.clientHeight;
    BOTTOM_THRESHOLD;
    const hasMyMessage = visibleMessages.some(
      ({ clientId }) => clientId === getClientId(),
    );
    stickToBottomRef.current = isNearBottom || hasMyMessage;

    setMessages((prev) => {
      if (!prev) return prev;

      // 같은 messageId는 한 번만 (등록 응답 + SSE로 두 번 올 수 있음)
      const savedIds = new Set(prev.map(({ messageId }) => messageId));
      const added = visibleMessages.filter(
        ({ messageId }) => !savedIds.has(messageId),
      );

      return added.length > 0 ? [...prev, ...added] : prev;
    });
  }, []);

  // SSE 재연결 후 끊긴 동안 놓친 메시지 불러오기
  const recoverMissedMessages = useCallback(async () => {
    try {
      // limit보다 많이 놓쳤으면 after를 갱신해서 이어서 조회
      for (let after = lastMessageIdRef.current; after;) {
        const missed = await fetchNewerMessages("all", after);
        appendMessages(missed);

        after =
          missed.length === SOMTALK_PAGE_SIZE
            ? missed[missed.length - 1].messageId
            : null;
      }
    } catch {
      // 실패하면 다음 재연결이나 새로고침 때 다시 받아옴
    }
  }, [appendMessages]);

  // SSE 연결: 화면 들어오면 연결, 나가면 끊기
  useEffect(() => {
    const eventSource = new EventSource(CHAT_STREAM_URL);
    let wasDisconnected = false;

    const handleMessage = (event) => {
      try {
        appendMessages([JSON.parse(event.data)]);
      } catch {
        // 형식이 잘못된 데이터는 무시
      }
    };

    // 끊기면 EventSource가 알아서 재연결함
    const handleError = () => {
      wasDisconnected = true;
    };

    // 재연결되면 놓친 메시지 복구
    const handleOpen = () => {
      if (!wasDisconnected) return;
      wasDisconnected = false;
      recoverMissedMessages();
    };

    eventSource.addEventListener(CHAT_MESSAGE_EVENT, handleMessage);
    eventSource.addEventListener("error", handleError);
    eventSource.addEventListener("open", handleOpen);

    return () => eventSource.close();
  }, [appendMessages, recoverMissedMessages]);

  // 맨 위 글보다 옛날 글 불러와서 위에 붙이기
  // 추가: 자동 불러오기에서도 쓰려고 useCallback으로 감쌈
  const loadOlderMessages = useCallback(async () => {
    const list = messagesRef.current;
    if (!list || !messages?.length || isLoadingOlderRef.current) return;

    isLoadingOlderRef.current = true;
    const requestedTab = selectedTab;

    try {
      const older = await fetchOlderMessages(
        requestedTab,
        messages[0].messageId,
      );

      // 불러오는 사이 탭을 바꿨거나 검색했으면 버리기
      const { tab, keyword: currentKeyword } = viewRef.current;
      if (tab !== requestedTab || currentKeyword) return;

      setHasMoreOlder(older.length === SOMTALK_PAGE_SIZE);
      if (older.length === 0) return;

      // 붙이기 직전 위치 기억 → 붙인 뒤 읽던 곳 그대로 유지
      scrollAnchorRef.current = {
        height: list.scrollHeight,
        top: list.scrollTop,
      };
      stickToBottomRef.current = false;

      setMessages((prev) => {
        const savedIds = new Set(prev.map(({ messageId }) => messageId));
        const added = older.filter(({ messageId }) => !savedIds.has(messageId));
        return [...added, ...prev];
      });
    } catch {
      // 실패하면 다시 스크롤할 때 재시도
    } finally {
      isLoadingOlderRef.current = false;
    }
  }, [messages, selectedTab]);

  // 추가: 글이 적어서 화면이 다 안 차면 스크롤이 안 생기니까,
  // 옛날 글이 더 있으면 화면이 찰 때까지 자동으로 더 불러오기
  useEffect(() => {
    const list = messagesRef.current;
    if (!list || searchKeyword || !hasMoreOlder) return;
    if (list.scrollHeight <= list.clientHeight) loadOlderMessages();
  }, [messages, searchKeyword, hasMoreOlder, loadOlderMessages]);

  // 맨 위 근처까지 스크롤하면 옛날 글 불러오기
  const handleMessagesScroll = () => {
    const list = messagesRef.current;
    if (!list || searchKeyword || !hasMoreOlder) return;
    if (list.scrollTop < TOP_THRESHOLD) loadOlderMessages();
  };

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

  // 등록 응답으로 받은 내 글을 바로 추가 (SSE로 또 와도 중복 제거됨)
  const handleWriteSubmit = async (newMessage) => {
    const savedMessage = await createMessage(newMessage);
    setIsWriting(false);
    appendMessages([savedMessage]);

    // SSE로 먼저 들어온 경우에도 내 글은 무조건 맨 아래로
    stickToBottomRef.current = true;
    setScrollToBottomCount((count) => count + 1);
  };

  const renderMessages = () => {
    if (hasLoadError) {
      const { title, description } = SOMTALK_EMPTY_TEXT.error;

      return (
        <div className="somtalk-empty">
          <p className="somtalk-empty__face" aria-hidden="true">
            (π_π)
          </p>
          <p className="somtalk-empty__title">{title}</p>
          <p className="somtalk-empty__description">{description}</p>
        </div>
      );
    }

    if (!messages) return null;

    return <SomTalkMessageList messages={messages} keyword={searchKeyword} />;
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
          onScroll={handleMessagesScroll}
        >
          {renderMessages()}
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
