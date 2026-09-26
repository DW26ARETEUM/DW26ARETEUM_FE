import "../styles/FoodTruckDetail.css";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";

// API 개발 전 화면 확인용 목데이터입니다.
// TODO(백엔드 완료 후): 푸드트럭 상세 API 응답으로 교체합니다.
const previewFoodTruck = {
  category: "푸드트럭",
  name: "부엉이푸드",
  date: "9/29 - 9/30",
  time: "12:00 ~ 22:00 / 12:00 ~ 22:00",
  location: "민주광장 - 푸드트럭",
  operator: "개인 운영",
  locationImage: null,
};

// 세부정보 탭에서 보여 줄 임시 메뉴입니다.
// TODO(백엔드 완료 후): API가 제공하는 메뉴명과 가격으로 교체합니다.
const previewMenu = [
  { name: "불초밥", price: "12000₩" },
  { name: "연어초밥", price: "13000₩" },
];

// 수정: 헤더·팝업·탭과 기본정보를 팀 공통 컴포넌트로 표시합니다.
export default function FoodTruckDetail({ onBack, onHome }) {
  return (
    <BoothDetailLayout
      onBack={onBack}
      onHome={onHome}
      heading={
        <BoothDetailHeading
          category={previewFoodTruck.category}
          title={previewFoodTruck.name}
        />
      }
      basicInfo={
        <BoothBasicInfo
          date={previewFoodTruck.date}
          time={previewFoodTruck.time}
          location={previewFoodTruck.location}
          operator={previewFoodTruck.operator}
          locationImage={previewFoodTruck.locationImage}
          locationImageAlt="푸드트럭 위치 안내"
        />
      }
      detailInfo={
        <BoothDetailPanel>
          <h3 className="food-truck-detail__menu-title">
            <span>~</span> MENU <span>~</span>
          </h3>

          <ul className="food-truck-detail__menu-list">
            {previewMenu.map(({ name, price }) => (
              <li key={name}>
                <span>{name}</span>
                <span className="food-truck-detail__menu-price">{price}</span>
              </li>
            ))}
          </ul>
        </BoothDetailPanel>
      }
    />
  );
}
