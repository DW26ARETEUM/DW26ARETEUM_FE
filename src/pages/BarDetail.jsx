import { useParams } from "react-router-dom";
import "../styles/BarDetail.css";
import { formatBoothSchedule, getOperationForDay } from "../api/boothApi.js";
import useBoothDetail from "../hooks/useBoothDetail.js";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";
import BoothDetailStatus from "../components/boothDetail/BoothDetailStatus.jsx";

const CATEGORY_LABEL = "주점";

export default function BarDetail({ onBack, onHome }) {
  const { day, boothId } = useParams();
  const { status, booth } = useBoothDetail(boothId, "PUB");

  if (!booth) {
    return (
      <BoothDetailStatus
        category={CATEGORY_LABEL}
        status={status}
        onBack={onBack}
        onHome={onHome}
      />
    );
  }

  const operations = booth.operations ?? [];
  const menus = booth.menus ?? [];
  const schedule = formatBoothSchedule(operations);
  const operation = getOperationForDay(operations, day) ?? operations[0];

  return (
    <BoothDetailLayout
      key={`${day}-${booth.id}`}
      heading={(selectedTab) =>
        selectedTab === "detail" ? (
          <BoothDetailHeading
            category={booth.organizer ?? booth.name}
            logo={booth.iconImageUrl}
            logoAlt={`${booth.organizer ?? booth.name} 로고`}
          />
        ) : (
          <BoothDetailHeading
            category={CATEGORY_LABEL}
            subtitle={booth.organizer}
            title={booth.name}
          />
        )
      }
      basicInfo={
        <BoothBasicInfo
          date={schedule.date}
          time={schedule.time}
          location={booth.locationName}
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
              {menus.map(({ id, name, priceText, description }) => (
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
