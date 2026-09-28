import useBoothDetail from "../api/useBoothDetail.js";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";

import "../styles/FestivalBoothDetail.css";

export default function FestivalBoothDetail({ onBack, onHome }) {
  const { booth, message, operation, schedule } = useBoothDetail("COMMITTEE");

  if (!booth) {
    return (
      <BoothDetailLayout
        heading={
          <BoothDetailHeading
            category="축운위 부스"
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

  const location = `${booth.locationName} - 축운위 ${operation?.mapNumber ?? ""}번`;

  return (
    <BoothDetailLayout
      key={booth.id}
      heading={<BoothDetailHeading category="축운위 부스" title={booth.name} />}
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
