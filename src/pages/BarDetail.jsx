import { useParams } from "react-router-dom";
import "../styles/BarDetail.css";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";
import { BAR_BOOTHS } from "../mocks/barBooths.js";

export default function BarDetail({
  day: dayProp = "29",
  boothId: boothIdProp = "1",
  onBack,
  onHome,
}) {
  const params = useParams();
  const day = params.day ?? dayProp;
  const boothId = Number(params.boothId ?? boothIdProp);
  const booth = BAR_BOOTHS.find(({ id }) => id === boothId);
  const schedule = booth?.schedules[day];

  if (!booth || !schedule) {
    return (
      <BoothDetailLayout
        heading={
          <BoothDetailHeading
            category="주점"
            title="부스 정보를 찾을 수 없어요"
          />
        }
        basicInfo={null}
        detailInfo={null}
        onBack={onBack}
        onHome={onHome}
      />
    );
  }

  return (
    <BoothDetailLayout
      key={`${day}-${booth.id}`}
      heading={(selectedTab) =>
        selectedTab === "detail" ? (
          <BoothDetailHeading
            category={booth.operator}
            logo={booth.logo}
            logoAlt={`${booth.operator} 로고`}
          />
        ) : (
          <BoothDetailHeading
            category={booth.category}
            subtitle={booth.organization}
            title={booth.name}
          />
        )
      }
      basicInfo={
        <BoothBasicInfo
          date={schedule.date}
          time={schedule.time}
          location={booth.location}
          operator={booth.operator}
          locationImage={booth.locationImage}
          locationImageAlt={`${booth.name} 위치 안내`}
        />
      }
      detailInfo={
        <BoothDetailPanel>
          <div className="bar-menu">
            <h3 className="bar-menu__title">
              <span>~</span> MENU <span>~</span>
            </h3>

            <ul className="bar-menu__list">
              {schedule.menu.map(({ name, price, description }) => (
                <li
                  key={name}
                  className={
                    description
                      ? "bar-menu__item bar-menu__item--with-description"
                      : "bar-menu__item"
                  }
                >
                  <div className="bar-menu__text">
                    <span className="bar-menu__name">{name}</span>
                    {description && (
                      <span className="bar-menu__description">
                        {description}
                      </span>
                    )}
                  </div>
                  <span className="bar-menu__price">{price}₩</span>
                </li>
              ))}
            </ul>
          </div>
        </BoothDetailPanel>
      }
      onBack={onBack}
      onHome={onHome}
    />
  );
}
