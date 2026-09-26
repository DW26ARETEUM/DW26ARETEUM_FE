import profileImage from "../../assets/images/somtalk/somProfile.png";
import bubbleImage from "../../assets/images/somtalk/bubble.svg";
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

export default function SomTalkMessageList({ messages }) {
  const myClientId = getClientId();

  return (
    <ol
      className="somtalk-messages"
      // 작은 SVG는 따옴표가 든 data URL로 바뀌어서 큰따옴표로 감싸야 함
      style={{ "--bubble-image": `url("${bubbleImage}")` }}
    >
      {messages.map((message, index) => {
        const date = formatDate(message.createdAt);
        const isNewDate =
          index === 0 || date !== formatDate(messages[index - 1].createdAt);
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
              <p className="somtalk-message__bubble">{message.content}</p>
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
  );
}
