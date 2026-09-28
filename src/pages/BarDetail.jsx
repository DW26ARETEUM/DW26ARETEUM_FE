import useBoothDetail from "../api/useBoothDetail.js";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";

import "../styles/BarDetail.css";

export default function BarDetail({ onBack, onHome }) {
  const { booth, message, operation, schedule } = useBoothDetail("PUB");

  if (!booth) {
    return (
      <BoothDetailLayout
        heading={
          <BoothDetailHeading
            category="주점"
            title="부스 정보를 찾을 수 없어요"
          />
        }
        basicInfo={<p aria-live="polite">{message}</p>}
        detailInfo={<p aria-live="polite">{message}</p>}
        onBack={onBack}
        onHome={onHome}
      />
    );
  }

  const location = `${booth.locationName} - 주점 ${operation?.mapNumber ?? ""}번`;

  return (
    <BoothDetailLayout
      key={booth.id}
      heading={(selectedTab) =>
        selectedTab === "detail" ? (
          <BoothDetailHeading
            category={booth.organizer}
            logo={booth.iconImageUrl}
            logoAlt={`${booth.organizer} 로고`}
          />
        ) : (
          <BoothDetailHeading
            category="주점"
            subtitle={booth.organizer}
            title={booth.name}
          />
        )
      }
      basicInfo={
        <BoothBasicInfo
          date={schedule.date}
          time={schedule.time}
          location={location}
          operator={booth.organizer}
          locationImage={operation?.locationImageUrl ?? null}
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
              {booth.menus.map(({ id, name, priceText, description }) => (
                <li
                  key={id}
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
                  <span className="bar-menu__price">{priceText}</span>
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
