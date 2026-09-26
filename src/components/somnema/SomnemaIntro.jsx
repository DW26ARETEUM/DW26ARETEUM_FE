// 솜네마 - 프로그램소개 탭 내용

export default function SomnemaIntro() {
  return (
    <div className="somnema-intro">
      <p className="somnema-intro__title">잠시 멈춰, 온전히 쉬어가는 시간</p>

      <p>
        {
          "바쁜 일상 속에서 잠시 벗어나\n좋아하는 사람과 영화를 보고,\n맛있는 음식도 먹으며\n아무 걱정 없이 쉬어가고 싶은 분들을 위해"
        }
      </p>

      <p>
        영화제, <span className="somnema-intro__name">&lt;솜네마&gt;</span>를
        준비했습니다.
      </p>

      <p>
        {
          "잔잔한 영화와 따뜻한 분위기 속에서\n여러분의 하루에 작은 쉼표를 찍어보세요."
        }
      </p>

      <p>
        {
          "일시: 2026.09.29(화)-2026.09.30(수)\n15:30-17:30\n장소: 동덕여자대학교 운동장"
        }
      </p>
    </div>
  );
}
