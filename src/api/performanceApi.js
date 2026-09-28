// 설정된 백엔드 주소를 확인
export const hasPerformanceApi = Boolean(
  import.meta.env.VITE_API_BASE_URL?.trim(),
);

// 공연 API의 공통 응답과 오류 처리
async function requestPerformance(path, signal) {
  if (!hasPerformanceApi) {
    throw new Error("공연 서버 주소가 아직 설정되지 않았습니다.");
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL.trim().replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/api/v1${path}`, { signal });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("공연 정보를 읽을 수 없습니다.");
  }

  if (!response.ok || !result.success || result.code !== "SUCCESS") {
    const error = new Error(
      result.message || "공연 정보를 불러오지 못했습니다.",
    );

    error.status = response.status;
    error.code = result.code;

    throw error;
  }

  return result.data;
}

// 선택한 날짜의 공연 목록을 조회
export function getPerformances(date, signal) {
  return requestPerformance(
    `/performances?date=${encodeURIComponent(date)}`,
    signal,
  );
}

// 공연 고유 ID로 상세 정보를 조회
export function getPerformance(performanceId, signal) {
  return requestPerformance(
    `/performances/${encodeURIComponent(performanceId)}`,
    signal,
  );
}
