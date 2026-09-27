import { useParams } from "react-router-dom";
import "../styles/GeneralBoothDetail.css";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";

// API 개발 전 두 일반부스 화면을 확인하기 위한 목데이터입니다.
// TODO(백엔드 완료 후): 실제 부스 ID와 상세 API 응답으로 교체합니다.
const previewBooths = {
  1: {
    category: "일반 부스",
    name: "MY bias",
    date: "9/29 - 9/30",
    time: "14:00~22:00 / 14:00~22:00",
    location: "동덕여대 운동장 일반부스 1번",
    operator: "개인 운영",
    locationImage: null,
  },
  2: {
    category: "일반 부스",
    name: "인문잡지 〈 영원 〉",
    date: "9/29 - 9/30",
    time: "14:00~19:00 / 14:00~19:00",
    location: "동덕여대 운동장 일반부스 2번",
    operator: "창업동아리 영원회귀",
    locationImage: null,
  },
};

// URL의 날짜와 임시 부스 번호를 확인해 상세 화면을 표시합니다.
export default function GeneralBoothDetail({ onBack, onHome }) {
  const { day, boothId } = useParams();
  const booth =
    day === "29" || day === "30" ? previewBooths[boothId] : undefined;

  if (!booth) {
    return (
      <BoothDetailLayout
        onBack={onBack}
        onHome={onHome}
        heading={
          <BoothDetailHeading
            category="일반 부스"
            title="부스 정보가 없습니다"
          />
        }
        basicInfo={
          <p className="general-booth-detail__message">
            해당 부스를 찾을 수 없습니다.
          </p>
        }
        detailInfo={
          <p className="general-booth-detail__message">
            해당 부스를 찾을 수 없습니다.
          </p>
        }
      />
    );
  }

  return (
    <BoothDetailLayout
      onBack={onBack}
      onHome={onHome}
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
          {/* TODO(세부정보 전달 후): 부스별 실제 세부정보를 표시합니다. */}
          <p className="general-booth-detail__message">
            세부정보 준비 중입니다.
          </p>
        </BoothDetailPanel>
      }
    />
  );
}
