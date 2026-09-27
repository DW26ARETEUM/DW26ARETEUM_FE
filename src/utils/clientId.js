// 브라우저별 사용자 식별자 (로그인 없이 내 글 구분용)

const STORAGE_KEY = "somtalk-client-id";
let cachedId = null;

const createId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();

  // crypto.randomUUID를 못 쓰는 환경(http) 대비
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
};

export function getClientId() {
  if (cachedId) return cachedId;

  try {
    cachedId = localStorage.getItem(STORAGE_KEY);

    if (!cachedId) {
      cachedId = createId();
      localStorage.setItem(STORAGE_KEY, cachedId);
    }
  } catch {
    // localStorage를 못 쓰는 환경(시크릿 모드 등)
    cachedId = createId();
  }

  return cachedId;
}
