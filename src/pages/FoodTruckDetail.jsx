import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FoodTruckDetail.css";
import {
  formatBoothSchedule,
  getBooth,
  getOperationForDay,
  hasBoothApi,
} from "../api/boothApi.js";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import BoothDetailHeading from "../components/boothDetail/BoothDetailHeading.jsx";
import BoothBasicInfo from "../components/boothDetail/BoothBasicInfo.jsx";
import BoothDetailPanel from "../components/boothDetail/BoothDetailPanel.jsx";

// 수정: 목록에서 전달한 날짜와 실제 부스 ID로 상세 정보를 조회합니다.
export default function FoodTruckDetail({ onBack, onHome }) {
  const { day, boothId } = useParams();
  const id = Number(boothId);
  const isValidRoute =
    (day === "29" || day === "30") && Number.isInteger(id) && id > 0;

  // 추가: 다른 부스 ID의 이전 응답이 화면에 나타나지 않도록 ID와 함께 저장합니다.
  const [requestResult, setRequestResult] = useState({
    boothId: null,
    data: null,
    status: "loading",
    message: "",
  });

  useEffect(() => {
    if (!hasBoothApi || !isValidRoute) return;

    const controller = new AbortController();

    getBooth(id, controller.signal)
      .then((data) => {
        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("부스 상세 응답 형식이 올바르지 않습니다.");
        }

        if (controller.signal.aborted) return;

        setRequestResult({
          boothId,
          data,
          status: data.category === "FOOD_TRUCK" ? "success" : "notFound",
          message: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error.name === "AbortError") return;

        setRequestResult({
          boothId,
          data: null,
          status:
            error.status === 404 || error.code === "BOOTH_NOT_FOUND"
              ? "notFound"
              : "error",
          message: error.message,
        });
      });

    // 추가: 다른 부스로 이동하면 이전 조회를 취소합니다.
    return () => controller.abort();
  }, [boothId, id, isValidRoute]);

  const currentResult =
    requestResult.boothId === boothId ? requestResult : null;

  const status = !isValidRoute
    ? "notFound"
    : !hasBoothApi
      ? "unconfigured"
      : (currentResult?.status ?? "loading");

  const booth = status === "success" ? currentResult.data : null;

  // 수정: 날짜·시간은 전체 운영 일정을 표시하고, 위치 이미지만 URL 날짜를 따릅니다.
  const schedule = formatBoothSchedule(booth?.operations);
  const operation = getOperationForDay(booth?.operations, day);

  const message =
    status === "unconfigured"
      ? "부스 서버 연결을 준비 중입니다."
      : status === "loading"
        ? "부스 정보를 불러오는 중입니다."
        : status === "notFound"
          ? "해당 부스를 찾을 수 없습니다."
          : currentResult?.message || "부스 정보를 불러오지 못했습니다.";

  return (
    // 추가: 이 페이지의 헤더 여백만 조정하기 위한 구분 클래스입니다.
    <div className="food-truck-detail-page">
      <BoothDetailLayout
        onBack={onBack}
        onHome={onHome}
        heading={
          <BoothDetailHeading
            category="푸드트럭"
            title={booth?.name ?? "부스 정보가 없습니다"}
          />
        }
        basicInfo={
          booth ? (
            <BoothBasicInfo
              date={schedule.date}
              time={schedule.time}
              location={booth.locationName}
              operator={booth.organizer}
              locationImage={operation?.locationImageUrl ?? null}
              locationImageAlt="푸드트럭 위치 안내"
            />
          ) : (
            <p className="food-truck-detail__message" aria-live="polite">
              {message}
            </p>
          )
        }
        detailInfo={
          booth ? (
            <BoothDetailPanel>
              <h3 className="food-truck-detail__menu-title">
                <span>~</span> MENU <span>~</span>
              </h3>

              <ul className="food-truck-detail__menu-list">
                {(booth.menus ?? []).map(({ id: menuId, name, priceText }) => (
                  <li key={menuId}>
                    <span>{name}</span>
                    <span className="food-truck-detail__menu-price">
                      {priceText}
                    </span>
                  </li>
                ))}
              </ul>
            </BoothDetailPanel>
          ) : (
            <p className="food-truck-detail__message" aria-live="polite">
              {message}
            </p>
          )
        }
      />
    </div>
  );
}
