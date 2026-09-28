import BoothDetailLayout from "./BoothDetailLayout.jsx";
import BoothDetailHeading from "./BoothDetailHeading.jsx";

const STATUS_MESSAGES = {
  unconfigured: "부스 서버 연결을 준비 중이에요",
  loading: "부스 정보를 불러오는 중이에요",
  notFound: "부스 정보를 찾을 수 없어요",
  error: "부스 정보를 불러오지 못했어요",
};

export default function BoothDetailStatus({
  category,
  status,
  onBack,
  onHome,
}) {
  return (
    <BoothDetailLayout
      heading={
        <BoothDetailHeading
          category={category}
          title={STATUS_MESSAGES[status] ?? STATUS_MESSAGES.error}
        />
      }
      basicInfo={null}
      detailInfo={null}
      onBack={onBack}
      onHome={onHome}
    />
  );
}
