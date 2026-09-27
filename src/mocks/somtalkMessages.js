import { getClientId } from "../utils/clientId.js";

// TODO(API): 백엔드 연동 후 삭제
// 피그마 예시 문구로 만든 가짜 메시지 (오래된 순)
export const SOMTALK_MOCK_MESSAGES = [
  {
    id: 1,
    category: "chat",
    content: "와..무대를 찢어놓으셨다...",
    clientId: "other-1",
    createdAt: "2026-09-29T08:01:00",
  },
  {
    id: 2,
    category: "chat",
    content: "A",
    clientId: "other-2",
    createdAt: "2026-09-29T08:01:00",
  },
  {
    id: 3,
    category: "info",
    content: "솜칭코는 몇시부터인가요?",
    clientId: "other-3",
    createdAt: "2026-09-29T08:01:00",
  },
  {
    id: 4,
    category: "info",
    content: "솜칭코를 포함한 축운위 부스는 12시부터입니다~",
    clientId: "other-4",
    createdAt: "2026-09-29T08:01:00",
  },
  {
    id: 5,
    category: "chat",
    content: "축제 짱! 솜솜이들 화이팅!<3",
    clientId: getClientId(),
    createdAt: "2026-09-29T08:01:00",
  },
  {
    id: 6,
    category: "info",
    content:
      "솜칭코를 포함한 축운위 부스는 12시부터입니다~ 솜칭코를 포함한 축운위 부스는 12시부터입니다~",
    clientId: "other-5",
    createdAt: "2026-09-30T13:25:00",
  },
];
