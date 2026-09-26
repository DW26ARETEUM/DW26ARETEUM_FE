// 솜톡 API 모음
// TODO(API): 명세서 받으면 가짜 데이터 대신 실제 요청으로 교체
// 요청 헤더에 X-Client-Id: getClientId() 담기

import { SOMTALK_MOCK_MESSAGES } from "../mocks/somtalkMessages.js";
import { getClientId } from "../utils/clientId.js";

// 메시지 목록 조회 (오래된 순)
export async function fetchMessages(category) {
  // TODO(API): GET 요청으로 교체
  if (category === "all") return SOMTALK_MOCK_MESSAGES;

  return SOMTALK_MOCK_MESSAGES.filter(
    (message) => message.category === category,
  );
}

// 메시지 등록
export async function createMessage({ category, content }) {
  // TODO(API): POST 요청으로 교체
  const message = {
    id: Date.now(),
    category,
    content,
    clientId: getClientId(),
    createdAt: new Date().toISOString(),
  };

  SOMTALK_MOCK_MESSAGES.push(message);
  return message;
}
