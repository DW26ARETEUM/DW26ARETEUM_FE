import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/GeneralBoothDetail.css";
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

// 추가: 피그마에서 두 줄로 표시한 일반부스 제목만 줄바꿈합니다.
function formatGeneralBoothTitle(name) {
  if (name.startsWith("외계인침공 시")) {
    return name.replace(/^(외계인침공 시)\s*/, "$1\n");
  }

  if (name.startsWith("아레테움 온에어")) {
    return name.replace(/^(아레테움 온에어)\s*/, "$1\n");
  }

  return name;
}

// 추가: 위치명이 이미 번호를 포함하면 선택 날짜의 지도 번호로 교체합니다.
function getLocationText(locationName, mapNumber) {
  if (mapNumber == null) return locationName;

  if (/일반\s*부스\s*\d+\s*번/.test(locationName)) {
    return locationName.replace(
      /일반\s*부스\s*\d+\s*번/,
      `일반부스 ${mapNumber}번`,
    );
  }

  if (/일반\s*부스/.test(locationName)) {
    return `${locationName} ${mapNumber}번`;
  }

  return `${locationName} 일반부스 ${mapNumber}번`;
}

// 수정: URL의 날짜와 실제 부스 ID로 일반부스 상세 정보를 조회합니다.
export default function GeneralBoothDetail({ onBack, onHome }) {
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
          status: data.category === "GENERAL" ? "success" : "notFound",
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

  // 수정: 날짜·시간은 전체 운영 일정을 표시하고, 위치만 URL 날짜를 따릅니다.
  const schedule = formatBoothSchedule(booth?.operations);
  const operation = getOperationForDay(booth?.operations, day);
  const location = booth
    ? getLocationText(booth.locationName, operation?.mapNumber)
    : "";

  const message =
    status === "unconfigured"
      ? "부스 서버 연결을 준비 중입니다."
      : status === "loading"
        ? "부스 정보를 불러오는 중입니다."
        : status === "notFound"
          ? "해당 부스를 찾을 수 없습니다."
          : currentResult?.message || "부스 정보를 불러오지 못했습니다.";

  if (!booth) {
    return (
      // 추가: 이 페이지의 헤더 여백만 조정하기 위한 구분 클래스입니다.
      <div className="general-booth-detail-page">
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
            <p className="general-booth-detail__message" aria-live="polite">
              {message}
            </p>
          }
          detailInfo={
            <p className="general-booth-detail__message" aria-live="polite">
              {message}
            </p>
          }
        />
      </div>
    );
  }

  return (
    // 추가: 이 페이지의 헤더 여백만 조정하기 위한 구분 클래스입니다.
    <div className="general-booth-detail-page">
      <BoothDetailLayout
        onBack={onBack}
        onHome={onHome}
        heading={
          <BoothDetailHeading
            category="일반 부스"
            title={formatGeneralBoothTitle(booth.name)}
          />
        }
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
            {/* 수정: 일반 부스의 세부정보는 등록된 정보 없음 화면으로 표시합니다. */}
            <div className="general-booth-detail__empty">
              <p className="general-booth-detail__empty-icon">(π_π)</p>
              <p className="general-booth-detail__empty-text">
                등록된 정보가 없어요.
              </p>
            </div>
          </BoothDetailPanel>
        }
      />
    </div>
  );
}
