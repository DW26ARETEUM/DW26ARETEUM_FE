import { useState } from "react";
import "../styles/FoodTruckDetail.css";
import background from "../assets/images/background/home.png";
import popup from "../assets/images/boothDetail.png";
import backButton from "../assets/images/backbtn.svg";
import homeButton from "../assets/images/homebtn.svg";
import tabActive from "../assets/images/booth/tabActive.svg";
import tabInactive from "../assets/images/booth/tabInactive.svg";
import dateIcon from "../assets/images/booth/date.svg";
import timeIcon from "../assets/images/booth/time.svg";
import locationIcon from "../assets/images/booth/location.svg";
import personIcon from "../assets/images/booth/person.svg";

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

// 기본정보와 세부정보 탭을 전환합니다.
export default function FoodTruckDetail({ onBack, onHome }) {
  const [selectedTab, setSelectedTab] = useState("basic");

  return (
    <main
      className="food-truck-detail"
      style={{ backgroundImage: `url(${background})` }}
    >
      <header className="food-truck-detail__header">
        <button
          type="button"
          className="food-truck-detail__nav food-truck-detail__nav--back"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <img src={backButton} alt="" />
        </button>

        <h1>부스상세</h1>

        <button
          type="button"
          className="food-truck-detail__nav food-truck-detail__nav--home"
          onClick={onHome}
          aria-label="홈으로"
        >
          <img src={homeButton} alt="" />
        </button>
      </header>

      <section
        className="food-truck-detail__popup"
        aria-label="푸드트럭 상세 정보"
      >
        <img className="food-truck-detail__frame" src={popup} alt="" />

        <div className="food-truck-detail__heading">
          <p>{previewFoodTruck.category}</p>
          <h2>{previewFoodTruck.name}</h2>
        </div>

        <div
          className="food-truck-detail__tabs"
          role="tablist"
          aria-label="푸드트럭 정보"
        >
          {[
            { value: "basic", label: "기본정보" },
            { value: "detail", label: "세부정보" },
          ].map(({ value, label }) => (
            <button
              key={value}
              id={`food-truck-tab-${value}`}
              type="button"
              role="tab"
              aria-selected={selectedTab === value}
              aria-controls={`food-truck-panel-${value}`}
              className="food-truck-detail__tab"
              onClick={() => setSelectedTab(value)}
            >
              {/* 수정: SVG를 버튼 안의 이미지로 표시합니다. */}
              <img
                src={selectedTab === value ? tabActive : tabInactive}
                alt=""
              />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {selectedTab === "basic" ? (
          <div
            id="food-truck-panel-basic"
            className="food-truck-detail__basic"
            role="tabpanel"
            aria-labelledby="food-truck-tab-basic"
          >
            <h3 className="food-truck-detail__section-title">운영</h3>

            <dl className="food-truck-detail__operation">
              <div>
                <dt>
                  <img src={dateIcon} alt="날짜" />
                </dt>
                <dd>{previewFoodTruck.date}</dd>
              </div>

              <div>
                <dt>
                  <img src={timeIcon} alt="시간" />
                </dt>
                <dd>{previewFoodTruck.time}</dd>
              </div>

              <div>
                <dt>
                  <img src={locationIcon} alt="위치" />
                </dt>
                <dd>{previewFoodTruck.location}</dd>
              </div>

              <div>
                <dt>
                  <img src={personIcon} alt="운영자" />
                </dt>
                <dd>{previewFoodTruck.operator}</dd>
              </div>
            </dl>

            <h3 className="food-truck-detail__section-title food-truck-detail__section-title--location">
              위치 상세
            </h3>

            <div className="food-truck-detail__location">
              {/* TODO(위치 이미지 준비 후): 푸드트럭 위치 이미지를 연결합니다. */}
              {previewFoodTruck.locationImage && (
                <img
                  src={previewFoodTruck.locationImage}
                  alt="푸드트럭 위치 안내"
                />
              )}
            </div>
          </div>
        ) : (
          <div
            id="food-truck-panel-detail"
            className="food-truck-detail__detail"
            role="tabpanel"
            aria-labelledby="food-truck-tab-detail"
          >
            <h3 className="food-truck-detail__menu-title">
              <span>~</span> MENU <span>~</span>
            </h3>

            <ul className="food-truck-detail__menu-list">
              {previewMenu.map(({ name, price }) => (
                <li key={name}>
                  <span>{name}</span>
                  <span className="food-truck-detail__menu-price">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}