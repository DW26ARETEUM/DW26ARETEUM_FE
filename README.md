실행방법: npm run dev

## 🤝 Git & GitHub 협업 규칙

### 🌿 1. 브랜치 전략

- `main`: 배포 전용 브랜치 (직접 Push 금지)
- `develop`: 개발 통합 브랜치
- `feat/#이슈번호-기능명`: 새로운 기능 개발 (예: `feat/#12-login`)
- `fix/#이슈번호-버그명`: 버그 수정 (예: `fix/#34-header-layout`)

---

### 📋 2. 이슈(Issue) 규칙

- **작업 시작 전 이슈 작성이 필수**입니다.
- **이슈 제목 형식**: `[FEAT] 기능명` 또는 `[FIX] 버그명`
- **이슈 템플릿 사용**:
  - 기능 개발/요청: `Feature Request` (`feature.md`)
  - 버그 리포트: `Bug Report` (`bug.md`)

---

### 🔀 3. PR (Pull Request) 규칙

- **PR 대상 브랜치**:
  - `feat` / `fix` 브랜치 $\rightarrow$ `develop` 으로 PR
  - `develop` $\rightarrow$ `main` 은 **배포 시점**에만 머지
- **PR 작성 조건**:
  - **이슈 없이 PR 생성 금지** (`closes #이슈번호` 구문 필수 포함)
  - PR 제목은 **커밋 컨벤션과 동일한 형식**으로 작성
  - PR 템플릿 양식(`.github/pull_request_template.md`)에 맞춰 작성
- **머지(Merge) 조건**:
  - PR 생성 시 자동 실행되는 CI(타입 체크, 린트, 포맷, 테스트, 빌드) 검증 통과
  - 팀원 **최소 1명 이상** 승인(Approve)
  - PR 내의 **모든 리뷰 댓글이 Resolve**된 상태
- **진행 절차**: PR 작성 및 리뷰 요청 후 **팀원들에게 공지**
