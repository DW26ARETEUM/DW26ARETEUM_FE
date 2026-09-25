import { booths29 } from "../data/booths29.js";
import { booths30 } from "../data/booths30.js";

// 백엔드 검색 API가 연결되면 이 함수 내부만 API 요청으로 교체하면 됩니다.
export async function searchBooths({ query, date }) {
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

  if (!normalizedQuery) {
    return [];
  }

  const booths = date === 29 ? booths29 : booths30;

  return booths.filter((booth) => {
    if (booth.date !== date) {
      return false;
    }

    const searchableText = [
      booth.name,
      booth.organizer ?? "",
      booth.category,
      ...(booth.keywords ?? []),
    ]
      .join(" ")
      .toLocaleLowerCase("ko-KR");

    return searchableText.includes(normalizedQuery);
  });
}
