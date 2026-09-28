// 솜톡 고정 데이터

// value: 백엔드 category 값 ("all"은 category를 안 보냄)
export const SOMTALK_TABS = [
  { value: "all", label: "전체" },
  { value: "CHAT", label: "잡담" },
  { value: "INFO", label: "정보" },
];

export const MAX_MESSAGE_LENGTH = 53;

export const SOMTALK_EMPTY_TEXT = {
  search: {
    title: "검색 결과가 없어요!",
    description: "첫 번째 소식을 남겨보세요",
  },
  list: {
    title: "아직 소식이 없어요!",
    description: "첫 번째 소식을 남겨보세요",
  },
  error: {
    title: "메시지를 불러오지 못했어요",
    description: "잠시 후 새로고침 해주세요",
  },
};
