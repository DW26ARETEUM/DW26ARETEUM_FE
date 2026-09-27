import { useParams } from "react-router-dom";
import "../styles/SomCollectionDetail.css";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";
import { SOM_COLLECTION_BOOTHS } from "../mocks/somCollectionBooths.js";

const PRICE_NOTICE =
  "*기재된 가격은 예상 가격으로,\n축제 당일 가격과 상이할 수 있습니다.";

export default function SomCollectionDetail({
  day: dayProp = "29",
  boothId: boothIdProp = "1",
  onBack,
  onHome,
}) {
  const params = useParams();
  const day = params.day ?? dayProp;
  const boothId = Number(params.boothId ?? boothIdProp);
  const booth = SOM_COLLECTION_BOOTHS[day]?.find(({ id }) => id === boothId);

  if (!booth) {
    return (
      <BoothDetailLayout
        heading={
          <BoothDetailHeading
            category="솜컬렉션"
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
      heading={(selectedTab) => (
        <BoothDetailHeading
          category={booth.category}
          title={booth.name}
          notice={selectedTab === "detail" ? PRICE_NOTICE : undefined}
        />
      )}
      basicInfo={
        <BoothBasicInfo
          date={booth.date}
          time={booth.time}
          location={booth.location}
          operator={booth.operator}
          locationImage={booth.locationImage}
          locationImageAlt={`${booth.name} 위치 안내`}
        />
      }
      detailInfo={
        <BoothDetailPanel scrollable>
          {booth.items.length > 0 && (
            <ul className="som-collection-items">
              {booth.items.map(({ name, price }) => (
                <li key={name} className="som-collection-items__item">
                  <span className="som-collection-items__name">{name}</span>
                  <span className="som-collection-items__price">{price}₩~</span>
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
