import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PerformanceDetail.css";
import { getPerformance, hasPerformanceApi } from "../api/performanceApi.js";
import BoothDetailLayout from "../components/boothDetail/BoothDetailLayout.jsx";
import musicStaff from "../assets/images/booth/musicStaff.svg";
import dancers from "../assets/images/booth/dancers.svg";
import dateIcon from "../assets/images/booth/date.svg";
import timeIcon from "../assets/images/booth/time.svg";
import locationIcon from "../assets/images/booth/location.svg";
import personIcon from "../assets/images/booth/person.svg";

const imageFiles = import.meta.glob(
  "../assets/images/booth/performances/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, query: "?url", import: "default" },
);

// 수정: API 명세서의 공연 분류를 화면 문구로 바꿉니다.
const categoryLabels = {
  GENERAL: "일반 공연",
  CLUB: "동아리 공연",
  SPECIAL: "스페셜 스테이지",
  ARTIST: "아티스트",
};

// 추가: 공연 ID와 프론트 사진의 연결입니다. 배포 후 실제 ID를 대조합니다.
const imageFileById = {
  1: "29-hansori.png",
  2: "29-kim-myeonghyeon.png",
  3: "29-2003-june.png",
  4: "29-hapjeongdong.png",
  5: "29-jeon-yujin.png",
  6: "29-say-my-name.png",
  7: "29-izna.png",
  8: "29-younha.png",
  9: "30-soul-ng.png",
  10: "30-extasy.png",
  11: "30-ullove.png",
  12: "30-may.png",
  13: "30-park-kiyoung.png",
  14: "30-cherry-filter.png",
  15: "30-chungha.png",
  16: "30-stayc.png",
};

// 피그마 기준 255×170px로 표시하는 사진입니다.
const widePhotoFiles = new Set([
  "29-izna.png",
  "29-say-my-name.png",
  "30-cherry-filter.png",
  "30-stayc.png",
]);

// 수정: URL의 공연 고유 ID로 상세 API를 조회합니다.
export default function PerformanceDetail({ onBack, onHome }) {
  const { performanceId } = useParams();
  const id = Number(performanceId);
  const isValidId = Number.isInteger(id) && id > 0;

  // 수정: 응답이 어느 공연 ID의 것인지 함께 저장합니다.
  const [requestResult, setRequestResult] = useState({
    performanceId: null,
    data: null,
    status: "loading",
    message: "",
  });

  useEffect(() => {
    // 추가: 서버 주소가 없거나 ID가 잘못되었으면 요청하지 않습니다.
    if (!hasPerformanceApi || !isValidId) return;

    const controller = new AbortController();

    getPerformance(id, controller.signal)
      .then((data) => {
        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("공연 상세 응답 형식이 올바르지 않습니다.");
        }

        if (controller.signal.aborted) return;

        setRequestResult({
          performanceId,
          data,
          status: "success",
          message: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error.name === "AbortError") return;

        setRequestResult({
          performanceId,
          data: null,
          status:
            error.status === 404 || error.code === "PERFORMANCE_NOT_FOUND"
              ? "notFound"
              : "error",
          message: error.message,
        });
      });

    // 추가: 다른 공연으로 이동하면 이전 요청을 취소합니다.
    return () => controller.abort();
  }, [performanceId, id, isValidId]);

  // 추가: 이전 공연의 응답은 현재 공연 상세에 표시하지 않습니다.
  const currentResult =
    requestResult.performanceId === performanceId ? requestResult : null;
  const status = !isValidId
    ? "notFound"
    : !hasPerformanceApi
      ? "unconfigured"
      : (currentResult?.status ?? "loading");
  const performance = status === "success" ? currentResult.data : null;
  const errorMessage = currentResult?.message ?? "";

  const day = performance
    ? Number(performance.performanceDate.slice(8, 10))
    : null;

  const imageFile = performance ? imageFileById[performance.id] : null;
  const imagePath = imageFile
    ? `../assets/images/booth/performances/${imageFile}`
    : null;
  const image = imagePath ? imageFiles[imagePath] : null;

  // 수정: 합정동 공연은 피그마 위치에서 줄을 나누고, 영문 제목은 기존처럼 두 줄로 표시합니다.
  const displayTitle =
    performance?.title === "합정동 평화유지연합회"
      ? "합정동\n평화유지연합회"
      : performance?.titleEn
        ? `${performance.titleEn}\n${performance.title}`
        : performance?.title;

  return (
    <BoothDetailLayout
      showTabs={false}
      onBack={onBack}
      onHome={onHome}
      basicInfo={
        <div className="performance-detail__content">
          {status !== "success" ? (
            <p className="performance-detail__message" aria-live="polite">
              {status === "unconfigured"
                ? "공연 서버 연결을 준비 중입니다."
                : status === "loading"
                  ? "공연 정보를 불러오는 중입니다."
                  : status === "notFound"
                    ? "공연 정보가 없습니다."
                    : errorMessage}
            </p>
          ) : (
            <>
              <img
                className="performance-detail__music"
                src={musicStaff}
                alt=""
                aria-hidden="true"
              />

              <div className="performance-detail__heading">
                <p className="performance-detail__category">
                  {categoryLabels[performance.category] ?? performance.category}
                </p>
                <h2>{displayTitle}</h2>
              </div>

              {image && (
                <img
                  className={`performance-detail__photo${
                    widePhotoFiles.has(imageFile)
                      ? " performance-detail__photo--wide"
                      : ""
                  }`}
                  src={image}
                  alt={`${performance.title} 공연 이미지`}
                />
              )}

              <h3 className="performance-detail__info-title">세부 정보</h3>

              <img
                className="performance-detail__dancers"
                src={dancers}
                alt=""
                aria-hidden="true"
              />

              <dl className="performance-detail__info">
                <div>
                  <dt>
                    <img src={dateIcon} alt="날짜" />
                  </dt>
                  <dd>9월 {day}일</dd>
                </div>

                <div>
                  <dt>
                    <img src={timeIcon} alt="시간" />
                  </dt>
                  <dd>
                    {performance.startTime} ~ {performance.endTime}
                  </dd>
                </div>

                <div>
                  <dt>
                    <img src={locationIcon} alt="장소" />
                  </dt>
                  <dd>{performance.stage}</dd>
                </div>

                <div>
                  <dt>
                    <img src={personIcon} alt="출연" />
                  </dt>
                  <dd>{performance.performer}</dd>
                </div>
              </dl>
            </>
          )}
        </div>
      }
    />
  );
}
