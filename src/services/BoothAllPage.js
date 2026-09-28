const API_BASE_URL = import.meta.env.DEV
  ? "/backend-api"
  : import.meta.env.VITE_API_BASE_URL;

/**
 * 부스 목록 조회
 *
 * GET /api/v1/booths
 *
 * @param {Object} params
 * @param {string} params.date - yyyy-MM-dd
 * @param {string|null} params.category
 * @param {string|null} params.keyword
 * @param {number[]|null} params.ids
 * @param {AbortSignal|null} params.signal
 */
export async function getBooths({
  date,
  category = null,
  keyword = null,
  ids = null,
  signal = null,
}) {
  const params = new URLSearchParams();

  // 날짜는 필수
  params.append("date", date);

  // 카테고리
  if (category) {
    params.append("category", category);
  }

  // 검색어
  if (keyword?.trim()) {
    params.append("keyword", keyword.trim());
  }

  // 즐겨찾기 ID
  if (ids && ids.length > 0) {
    params.append("ids", ids.join(","));
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/booths?${params.toString()}`,
    { signal },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "부스 목록을 불러오지 못했습니다.");
  }

  return result.data;
}

/**
 * 부스 상세 조회
 *
 * GET /api/v1/booths/{boothId}
 */
export async function getBoothById(boothId, { signal = null } = {}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/booths/${boothId}`, {
    signal,
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "부스 정보를 불러오지 못했습니다.");
  }

  return result.data;
}
