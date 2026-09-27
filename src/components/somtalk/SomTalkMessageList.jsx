import profileImage from "../../assets/images/somtalk/somProfile.png";
import bubbleImage from "../../assets/images/somtalk/bubble.svg";
import { SOMTALK_EMPTY_TEXT } from "../../constants/somtalk.js";
import { getClientId } from "../../utils/clientId.js";

const pad = (number) => String(number).padStart(2, "0");

// 2026년 09월 29일
const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}년 ${pad(date.getMonth() + 1)}월 ${pad(
    date.getDate(),
  )}일`;
};

// 08:01 AM
const formatTime = (value) => {
  const date = new Date(value);
  const hours = date.getHours();
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${pad(hour12)}:${pad(date.getMinutes())} ${hours < 12 ? "AM" : "PM"}`;
};

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (content, keyword) => {
  if (!keyword) return content;

  const regex = new RegExp(`(${escapeRegExp(keyword)})`, "gi");

  return content.split(regex).map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="somtalk-message__highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

export default function SomTalkMessageList({ messages, keyword }) {
  const myClientId = getClientId();

  if (messages.length === 0) {
    const { title, description } =
      SOMTALK_EMPTY_TEXT[keyword ? "search" : "list"];

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

  return (
    <>
      {keyword && (
        // TODO(API): 페이지 단위로 받게 되면 전체 개수는 백엔드 값 사용
        <p className="somtalk-messages__result">
          ‘{keyword}’ 검색 결과 {messages.length}건
        </p>
      )}

      <ol
        className="somtalk-messages"
        style={{ "--bubble-image": `url("${bubbleImage}")` }}
      >
        {messages.map((message, index) => {
          const date = formatDate(message.createdAt);
          const isNewDate =
            !keyword &&
            (index === 0 || date !== formatDate(messages[index - 1].createdAt));
          const isMine = message.clientId === myClientId;

          return (
            <li key={message.id} className="somtalk-messages__item">
              {isNewDate && <p className="somtalk-messages__date">{date}</p>}

              <div
                className={`somtalk-message${
                  isMine ? " somtalk-message--mine" : ""
                }`}
              >
                {!isMine && (
                  <img
                    className="somtalk-message__profile"
                    src={profileImage}
                    alt=""
                  />
                )}
                <p className="somtalk-message__bubble">
                  {highlight(message.content, keyword)}
                </p>
                <time
                  className="somtalk-message__time"
                  dateTime={message.createdAt}
                >
                  {formatTime(message.createdAt)}
                </time>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
