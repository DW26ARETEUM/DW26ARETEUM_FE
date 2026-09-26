// 솜네마 - 유의사항 탭

export default function SomnemaNotice() {
  return (
    <div className="somnema-info">
      <p>영화제가 끝난 후 메인 공연이 중계됩니다</p>

      <p>
        영화제 입장 시간 내{" "}
        <span className="somnema-info__accent">자유로운 입장 및 착석</span>이
        {
          "\n가능합니다\n다른 관객에게 피해를 주지 않는 범위 내에서\n관람 중 이동이 가능합니다\n주류 및 음식의 반입이 가능합니다"
        }
      </p>

      <p>
        {"젤리 및 티켓 굿즈의 준비된 수량이 소진될 시\n조기 종료될 수 있습니다"}
      </p>
    </div>
  );
}
