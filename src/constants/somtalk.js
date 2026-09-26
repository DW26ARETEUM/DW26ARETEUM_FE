// 솜톡 고정 데이터

// TODO(API): value를 백엔드 카테고리 값과 맞추기
export const SOMTALK_TABS = [
  { value: "all", label: "전체" },
  { value: "chat", label: "잡담" },
  { value: "info", label: "정보" },
];

export const MAX_MESSAGE_LENGTH = 53;

// TODO(기디): 빈 화면 문구 확정되면 수정 임시로 아무말 적음
export const SOMTALK_EMPTY_TEXT = {
  search: {
    title: "검색 결과가 없어요!",
    description: "첫 번째 소식을 남겨보세요",
  },
  list: {
    title: "아직 소식이 없어요!",
    description: "첫 번째 소식을 남겨보세요",
  },
};
