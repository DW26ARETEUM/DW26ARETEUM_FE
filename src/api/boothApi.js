// 추가: 공연 API와 같은 서버 주소를 사용합니다.
const API_BASE_URL = (
  import.meta.env.DEV
    ? "/backend-api"
    : (import.meta.env.VITE_API_BASE_URL ?? "")
).replace(/\/+$/, "");

export const hasBoothApi = Boolean(API_BASE_URL);

// 추가: 부스 ID로 상세 정보를 조회하고 공통 응답의 data를 반환합니다.
export async function getBooth(boothId, signal) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/booths/${encodeURIComponent(boothId)}`,
    { signal },
  );

  let result;

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok || result?.success !== true || result?.code !== "SUCCESS") {
    const error = new Error(
      result?.message || "부스 정보를 불러오지 못했습니다.",
    );
    error.status = response.status;
    error.code = result?.code;
    throw error;
  }

  return result.data;
}

// 추가: 전체 운영 일정으로 기존 화면의 양일 날짜·시간 문구를 만듭니다.
export function formatBoothSchedule(operations) {
  const schedules = Array.isArray(operations) ? operations : [];

  return {
    date: schedules
      .map(({ operationDate }) => {
        const [, month, day] = operationDate.split("-");
        return `${Number(month)}/${Number(day)}`;
      })
      .join(" - "),
    time: schedules
      .map(({ startTime, endTime }) => `${startTime} ~ ${endTime}`)
      .join(" / "),
  };
}

// 추가: URL에서 선택한 날짜의 위치 이미지와 지도 번호를 찾습니다.
export function getOperationForDay(operations, day) {
  return operations?.find(
    ({ operationDate }) => operationDate === `2026-09-${day}`,
  );
}
