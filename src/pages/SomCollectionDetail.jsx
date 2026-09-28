import useBoothDetail from "../api/useBoothDetail.js";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";

import "../styles/SomCollectionDetail.css";

const PRICE_NOTICE =
  "*기재된 가격은 예상 가격으로,\n축제 당일 가격과 상이할 수 있습니다.";

export default function SomCollectionDetail({ onBack, onHome }) {
  const { booth, message, operation, schedule } =
    useBoothDetail("SOM_COLLECTION");

  if (!booth) {
    return (
      <BoothDetailLayout
        heading={
          <BoothDetailHeading
            category="솜컬렉션"
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

  const location = `${booth.locationName} - 솜컬렉션 ${operation?.mapNumber ?? ""}번`;

  return (
    <BoothDetailLayout
      key={booth.id}
      heading={(selectedTab) => (
        <BoothDetailHeading
          category="솜컬렉션"
          title={booth.name}
          notice={selectedTab === "detail" ? PRICE_NOTICE : undefined}
        />
      )}
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
        <BoothDetailPanel scrollable>
          {booth.menus.length > 0 && (
            <ul className="som-collection-items">
              {booth.menus.map(({ id, name, priceText }) => (
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
