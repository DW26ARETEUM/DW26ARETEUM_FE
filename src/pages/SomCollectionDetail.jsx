import { useParams } from "react-router-dom";
import "../styles/SomCollectionDetail.css";
import { formatBoothSchedule, getOperationForDay } from "../api/boothApi.js";
import useBoothDetail from "../hooks/useBoothDetail.js";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";
import BoothDetailStatus from "../components/boothDetail/BoothDetailStatus.jsx";

const CATEGORY_LABEL = "솜컬렉션";

const PRICE_NOTICE =
  "*기재된 가격은 예상 가격으로,\n축제 당일 가격과 상이할 수 있습니다.";

export default function SomCollectionDetail({ onBack, onHome }) {
  const { day, boothId } = useParams();
  const { status, booth } = useBoothDetail(boothId, "SOM_COLLECTION");

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
      heading={(selectedTab) => (
        <BoothDetailHeading
          category={CATEGORY_LABEL}
          title={booth.name}
          notice={selectedTab === "detail" ? PRICE_NOTICE : undefined}
        />
      )}
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
        <BoothDetailPanel scrollable>
          {menus.length > 0 && (
            <ul className="som-collection-items">
              {menus.map(({ id, name, priceText }) => (
                <li key={id} className="som-collection-items__item">
                  <span className="som-collection-items__name">{name}</span>
                  <span className="som-collection-items__price">
                    {priceText}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </BoothDetailPanel>
      }
      onBack={onBack}
      onHome={onHome}
    />
  );
}
