import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backButton from "../assets/images/backbtn.svg";
import timeIcon from "../assets/images/booth/time.svg";
import locationIcon from "../assets/images/booth/location.svg";
import { getBooth29ById } from "../data/booths29.js";
import { getBooth30ById } from "../data/booths30.js";
import "./BoothDetailPage.css";

function BoothDetailPage() {
  const { boothId } = useParams();
  const navigate = useNavigate();
  const booth = getBooth29ById(boothId) ?? getBooth30ById(boothId);

  useLayoutEffect(() => {
    const scrollContainer = document.querySelector(".mobile-content");

    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [boothId]);

  if (!booth) {
    return (
      <main className="booth-detail-page booth-detail-empty">
        <p>부스 정보를 찾을 수 없어요.</p>
        <button type="button" onClick={() => navigate("/")}>목록으로 돌아가기</button>
      </main>
    );
  }

  return (
    <main className="booth-detail-page">
      <header className="booth-detail-header">
        <button type="button" aria-label="부스 목록으로 돌아가기" onClick={() => navigate(-1)}>
          <img src={backButton} alt="" />
        </button>
        <h1>부스 상세</h1>
      </header>

      <section className="booth-detail-card">
        <p className="booth-detail-category">{booth.category}</p>
        <h2>{booth.name}</h2>
        <dl>
          <div>
            <dt><img src={timeIcon} alt="운영 시간" /></dt>
            <dd>{booth.time}</dd>
          </div>
          <div>
            <dt><img src={locationIcon} alt="위치" /></dt>
            <dd>{booth.location}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

export default BoothDetailPage;
