// 솜네마 - 대여부스안내 탭

const RENTAL_ITEMS = ["담요", "미니테이블", "에어백"];

export default function SomnemaRental() {
  return (
    <div className="somnema-info">
      <p className="somnema-info__accent">
        {"편안한 영화 관람을 위해\n다양한 물품을 대여해드립니다."}
      </p>

      <p>
        <span className="somnema-info__accent">운영시간</span>
        {"\n15:00 ~ 21:30"}
      </p>

      <div>
        <p className="somnema-info__accent">대여 물품</p>
        <ul className="somnema-info__list">
          {RENTAL_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p>
        * 대여 물품은 <span className="somnema-info__strong">선착순</span>으로
        운영됩니다.
        {"\n* 운영 시간에 맞춰 당일 반납 부탁드립니다."}
      </p>
    </div>
  );
}
