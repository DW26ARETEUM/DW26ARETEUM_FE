import { useParams } from "react-router-dom";
import "../styles/FestivalBoothDetail.css";
import { formatBoothSchedule } from "../api/boothApi.js";
import useBoothDetail from "../hooks/useBoothDetail.js";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";
import BoothDetailStatus from "../components/boothDetail/BoothDetailStatus.jsx";

const CATEGORY_LABEL = "축운위 부스";

export default function FestivalBoothDetail({ onBack, onHome }) {
  const { boothId } = useParams();
  const { status, booth } = useBoothDetail(boothId, "COMMITTEE");

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
  const schedule = formatBoothSchedule(operations);

  return (
    <BoothDetailLayout
      key={booth.id}
      heading={
        <BoothDetailHeading category={CATEGORY_LABEL} title={booth.name} />
      }
      basicInfo={
        <BoothBasicInfo
          date={schedule.date}
          time={schedule.time}
          location={booth.locationName}
          operator={booth.organizer}
          locationImage={operations[0]?.locationImageUrl ?? null}
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
