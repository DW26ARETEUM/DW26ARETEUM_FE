// 솜네마 - 이벤트안내 탭

export default function SomnemaEvent() {
  return (
    <div className="somnema-info somnema-info--event">
      <p>
        <span className="somnema-info__accent">01. 젤리 증정</span>
        {"\n영화와 함께 즐길 수 있는\n젤리를 준비했습니다\n*선착순 제공"}
      </p>

      <p>
        <span className="somnema-info__accent">02. 감상평 이벤트</span>
        {
          "\n영화를 본 후 여러분의 감상을 남겨주세요!\n참여자 중 추첨을 통해 소정의 상품을 드립니다\n*1일차, 2일차 각각 추첨"
        }
      </p>

      <p>
        <span className="somnema-info__accent">03. 영화제 티켓 굿즈</span>
        {"\n솜네마를 기억할 수 있도록\n영화제 티켓도 준비했습니다"}
      </p>
    </div>
  );
}
