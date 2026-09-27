import { useParams } from "react-router-dom";
import "../styles/FestivalBoothDetail.css";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";
import { FESTIVAL_BOOTHS } from "../mocks/festivalBooths.js";

export default function FestivalBoothDetail({
  boothId: boothIdProp = "1",
  onBack,
  onHome,
}) {
  const params = useParams();
  const boothId = Number(params.boothId ?? boothIdProp);
  const booth = FESTIVAL_BOOTHS.find(({ id }) => id === boothId);

  if (!booth) {
    return (
      <BoothDetailLayout
        heading={
          <BoothDetailHeading
            category="축운위 부스"
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
      key={booth.id}
      heading={
        <BoothDetailHeading category={booth.category} title={booth.name} />
      }
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
        <BoothDetailPanel>
          {booth.description && (
            <p className="festival-booth-description">{booth.description}</p>
          )}
        </BoothDetailPanel>
      }
      onBack={onBack}
      onHome={onHome}
    />
  );
}
