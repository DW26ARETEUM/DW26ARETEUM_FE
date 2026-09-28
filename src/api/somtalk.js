// 솜톡 API (명세서: 3. 솜톡 저장 및 조회 / 4. 실시간 연결 SSE)

import { getClientId } from "../utils/clientId.js";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

const CHAT_URL = `${API_BASE_URL}/api/v1/chat`;
const PAGE_SIZE = 50;

// SSE 실시간 수신 주소
export const CHAT_STREAM_URL = `${CHAT_URL}/stream`;

// 공통 응답에서 data만 꺼내고, 실패하면 에러 던지기 (boothApi.js와 같은 방식)
async function request(url, options) {
  const response = await fetch(url, options);

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("솜톡 정보를 읽을 수 없습니다.");
  }

  if (!response.ok || result.success !== true || result.code !== "SUCCESS") {
    const error = new Error(result.message || "솜톡 요청에 실패했습니다.");
    error.status = response.status;
    error.code = result.code;
    throw error;
  }

  return result.data;
}

// 쿼리 만들기 ("전체" 탭이면 category를 아예 안 보냄)
const buildQuery = ({ category, ...params }) => {
  const query = new URLSearchParams({ limit: PAGE_SIZE, ...params });
  if (category && category !== "all") query.set("category", category);
  return query.toString();
};

// 최근 메시지 조회 (오래된 → 최신)
export function fetchMessages(category, signal) {
  return request(`${CHAT_URL}/messages?${buildQuery({ category })}`, {
    signal,
  });
}

// 이전 메시지 조회: before보다 옛날 글 (오래된 → 최신)
export function fetchOlderMessages(category, before, signal) {
  return request(`${CHAT_URL}/messages?${buildQuery({ category, before })}`, {
    signal,
  });
}

// 이후 메시지 조회: after보다 새 글, SSE 재연결 복구용 (오래된 → 최신)
export function fetchNewerMessages(category, after, signal) {
  return request(`${CHAT_URL}/messages?${buildQuery({ category, after })}`, {
    signal,
  });
}

// 메시지 검색 (최신 → 오래된)
export function searchMessages(category, keyword, signal) {
  return request(`${CHAT_URL}/messages?${buildQuery({ category, keyword })}`, {
    signal,
  });
}

// 메시지 등록
export function createMessage({ category, content }) {
  return request(`${CHAT_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Id": getClientId(),
    },
    body: JSON.stringify({ content, category }),
  });
}
