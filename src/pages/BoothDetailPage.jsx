import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import backButton from "../assets/images/backbtn.svg";
import locationIcon from "../assets/images/booth/location.svg";
import timeIcon from "../assets/images/booth/time.svg";
import { getBooth29ById } from "../data/booths29.js";
import { getBooth30ById } from "../data/booths30.js";
import { getBoothById } from "../services/BoothAllPage.js";

import "./BoothDetailPage.css";

const CATEGORY_NAMES = {
  GENERAL: "일반 부스",
  SOM_COLLECTION: "솜컬렉션",
  COMMITTEE: "축운위",
  FOOD_TRUCK: "푸드트럭",
  PUB: "주점",
};

function normalizeBoothDetail(booth, selectedDate) {
  const operation =
    booth.operations.find(
      (item) => Number(item.operationDate.slice(-2)) === selectedDate,
    ) ?? booth.operations[0];

  return {
    id: booth.id,
    category: CATEGORY_NAMES[booth.category] ?? booth.category,
    name: booth.name,
    organizer: booth.organizer,
    time: operation
      ? `${operation.startTime}~${operation.endTime}`
      : "운영 시간 미정",
    location: booth.locationName,
  };
}

function BoothDetailPage() {
  const { boothId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDate = location.state?.date;
  const staticBooth =
    getBooth29ById(boothId) ?? getBooth30ById(boothId) ?? null;
  const [apiResult, setApiResult] = useState({
    id: "",
    booth: null,
    error: "",
  });

  useLayoutEffect(() => {
    const scrollContainer = document.querySelector(".mobile-content");

    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [boothId]);

  useEffect(() => {
    if (staticBooth || !/^\d+$/.test(boothId)) {
      return undefined;
    }

    const controller = new AbortController();

    getBoothById(boothId, { signal: controller.signal })
      .then((booth) => {
        setApiResult({
          id: boothId,
          booth: normalizeBoothDetail(booth, selectedDate),
          error: "",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setApiResult({
            id: boothId,
            booth: null,
            error: "부스 정보를 불러오지 못했어요.",
          });
        }
      });

    return () => controller.abort();
  }, [boothId, selectedDate, staticBooth]);

  const booth =
    staticBooth ?? (apiResult.id === boothId ? apiResult.booth : null);
  const isLoading =
    !staticBooth && /^\d+$/.test(boothId) && apiResult.id !== boothId;
  const error = apiResult.id === boothId ? apiResult.error : "";

  if (isLoading) {
    return (
      <main className="booth-detail-page booth-detail-empty">
        <p>부스 정보를 불러오는 중...</p>
      </main>
    );
  }

  if (!booth) {
    return (
      <main className="booth-detail-page booth-detail-empty">
        <p>{error || "부스 정보를 찾을 수 없어요."}</p>
        <button type="button" onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </main>
    );
  }

  return (
    <main className="booth-detail-page">
      <header className="booth-detail-header">
        <button
          type="button"
          aria-label="부스 목록으로 돌아가기"
          onClick={() => navigate(-1)}
        >
          <img src={backButton} alt="" />
        </button>
        <h1>부스 상세</h1>
      </header>

      <section className="booth-detail-card">
        <p className="booth-detail-category">{booth.category}</p>
        <h2>{booth.name}</h2>
        <dl>
          <div>
            <dt>
              <img src={timeIcon} alt="운영 시간" />
            </dt>
            <dd>{booth.time}</dd>
          </div>
          <div>
            <dt>
              <img src={locationIcon} alt="위치" />
            </dt>
            <dd>{booth.location}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

export default BoothDetailPage;
