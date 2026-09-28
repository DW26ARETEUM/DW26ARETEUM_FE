import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import backButton from "../assets/images/backbtn.svg";
import cloudDefault from "../assets/images/cloudDefault.png";
import cloudSelected from "../assets/images/cloudSelected.png";

import selectedBtn from "../assets/images/selectedBtn.png";
import defaultBtn from "../assets/images/defaultBtn.png";
import searchBtn from "../assets/images/searchBtn.png";

import bookmarkEmpty from "../assets/images/booth/bookmark.svg";
import heartDefault from "../assets/images/booth/heartDefault.svg";
import heartSelected from "../assets/images/booth/heartSelected.svg";
import noSearchResults from "../assets/images/booth/nosearch.svg";
import favoritePopup from "../assets/images/booth/popup.svg";
import timeIcon from "../assets/images/booth/time.svg";
import locationIcon from "../assets/images/booth/location.svg";

import { getPerformances } from "../api/performanceApi.js";
import { getBooths } from "../services/BoothAllPage.js";

import "../styles/BoothAllPage.css";

const categories = [
  "전체",
  "일반부스",
  "솜컬렉션",
  "축운위",
  "푸드트럭",
  "주점",
  "공연소개",
];

const FAVORITES_STORAGE_KEY = "areteum-booth-favorites";
const FAVORITE_MODAL_CONFIRMED_KEY = "areteum-favorite-modal-confirmed";

const API_DATES = {
  29: "2026-09-29",
  30: "2026-09-30",
};

const API_CATEGORIES = {
  일반부스: "GENERAL",
  솜컬렉션: "SOM_COLLECTION",
  축운위: "COMMITTEE",
  푸드트럭: "FOOD_TRUCK",
  주점: "PUB",
};

const CATEGORY_NAMES = {
  GENERAL: "일반 부스",
  SOM_COLLECTION: "솜컬렉션",
  COMMITTEE: "축운위",
  FOOD_TRUCK: "푸드트럭",
  PUB: "주점",
};

function normalizeBooth(booth) {
  return {
    id: booth.id,
    apiCategory: booth.category,
    entityType: "booth",
    date: Number(booth.operationDate.slice(-2)),
    category: CATEGORY_NAMES[booth.category] ?? booth.category,
    name: booth.name,
    organizer: booth.organizer,
    time: `${booth.startTime}~${booth.endTime}`,
    location: booth.locationName,
    mapNumber: booth.mapNumber,
  };
}

function normalizePerformance(performance) {
  return {
    id: `performance-${performance.id}`,
    apiId: performance.id,
    entityType: "performance",
    date: Number(performance.performanceDate.slice(-2)),
    category: "공연",
    name: performance.title,
    organizer: performance.performer,
    time: `${performance.startTime}~${performance.endTime}`,
    location: performance.stage,
  };
}

function getBoothDetailPath(booth) {
  if (booth.entityType === "performance") {
    return `/performance/${booth.apiId}`;
  }

  const day = booth.date;

  switch (booth.apiCategory) {
    case "GENERAL":
      return `/booth/general/${day}/${booth.id}`;
    case "SOM_COLLECTION":
      return `/booth/som-collection/${day}/${booth.id}`;
    case "COMMITTEE":
      return `/booth/festival/${day}/${booth.id}`;
    case "FOOD_TRUCK":
      return `/foodtruck/detail/${day}/${booth.id}`;
    case "PUB":
      return `/booth/bar/${day}/${booth.id}`;
    default:
      return `/booths/${booth.id}`;
  }
}

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    // 부스 ID(Number)와 공연 ID("performance-3")를 모두 유지
    return parsedFavorites
      .map((id) => {
        if (typeof id === "string" && id.startsWith("performance-")) {
          return id;
        }

        const numericId = Number(id);
        return Number.isFinite(numericId) ? numericId : null;
      })
      .filter((id) => id !== null);
  } catch {
    return [];
  }
}
function DateButton({ date, selectedDate, onSelect }) {
  const isSelected = date === selectedDate;

  return (
    <button
      className="booth-date-button"
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(date)}
    >
      <img
        aria-hidden="true"
        src={isSelected ? cloudSelected : cloudDefault}
        alt=""
      />

      <span>{date === 29 ? "9/29" : "9/30"}</span>
    </button>
  );
}

function HeartButton({ boothId, isFavorite, onToggle, style }) {
  return (
    <button
      className="booth-heart-button"
      type="button"
      style={style}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      aria-pressed={isFavorite}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        onToggle(boothId);
      }}
    >
      <img src={isFavorite ? heartSelected : heartDefault} alt="" />
    </button>
  );
}

function BoothCard({ booth, isFavorite, onToggleFavorite }) {
  return (
    <article className="booth-data-card">
      <Link
        className="booth-card-link"
        to={getBoothDetailPath(booth)}
        state={{ date: booth.date }}
        aria-label={`${booth.name} 상세보기`}
      >
        <p>{booth.category}</p>

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
      </Link>

      <HeartButton
        boothId={booth.id}
        isFavorite={isFavorite}
        onToggle={onToggleFavorite}
      />
    </article>
  );
}

function BoothListArtwork({ booths, favorites, onToggleFavorite }) {
  return (
    <div className="booth-data-grid">
      {booths.map((booth) => (
        <BoothCard
          key={booth.id}
          booth={booth}
          isFavorite={favorites.includes(booth.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

function BoothAllPage() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(29);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [showFavorites, setShowFavorites] = useState(false);

  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

  const [pendingFavorite, setPendingFavorite] = useState(null);

  const [favorites, setFavorites] = useState(getInitialFavorites);
  const [booths, setBooths] = useState([]);
  const [favoriteBooths, setFavoriteBooths] = useState([]);
  const [loadState, setLoadState] = useState({ key: "", error: "" });
  const [searchError, setSearchError] = useState("");

  const searchRequestId = useRef(0);
  const listLoadKey = `list:${selectedDate}:${selectedCategory}`;
  const favoriteLoadKey = `favorites:${[...favorites].sort((a, b) => a - b).join(",")}`;

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (showFavorites || submittedQuery) {
      return undefined;
    }

    const controller = new AbortController();
    const requestKey = listLoadKey;
    const shouldLoadBooths = selectedCategory !== "공연소개";
    const shouldLoadPerformances =
      selectedCategory === "전체" || selectedCategory === "공연소개";
    const boothRequest = shouldLoadBooths
      ? getBooths({
          date: API_DATES[selectedDate],
          category: API_CATEGORIES[selectedCategory] ?? null,
          signal: controller.signal,
        })
      : Promise.resolve([]);
    const performanceRequest = shouldLoadPerformances
      ? getPerformances(API_DATES[selectedDate], controller.signal)
      : Promise.resolve([]);

    Promise.all([boothRequest, performanceRequest])
      .then(([boothItems, performanceItems]) => {
        const nextBooths = [
          ...boothItems.map(normalizeBooth),
          ...performanceItems.map(normalizePerformance),
        ];

        setBooths(nextBooths);
        setLoadState({ key: requestKey, error: "" });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setLoadState({
            key: requestKey,
            error: "부스 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
          });
        }
      });

    return () => controller.abort();
  }, [
    listLoadKey,
    selectedCategory,
    selectedDate,
    showFavorites,
    submittedQuery,
  ]);

  useEffect(() => {
    if (!showFavorites || favorites.length === 0) {
      return undefined;
    }

    const controller = new AbortController();
    const requestKey = favoriteLoadKey;

    // 일반 부스 즐겨찾기 ID
    const favoriteBoothIds = favorites.filter((id) => typeof id === "number");

    // 공연 즐겨찾기 ID
    const favoritePerformanceIds = favorites
      .filter((id) => typeof id === "string" && id.startsWith("performance-"))
      .map((id) => Number(id.replace("performance-", "")))
      .filter((id) => Number.isFinite(id));

    // 일반 부스 가져오기
    const boothRequests =
      favoriteBoothIds.length > 0
        ? Object.values(API_DATES).map((date) =>
            getBooths({
              date,
              ids: favoriteBoothIds,
              signal: controller.signal,
            }),
          )
        : [];

    // 공연 가져오기
    const performanceRequests =
      favoritePerformanceIds.length > 0
        ? Object.values(API_DATES).map((date) =>
            getPerformances(date, controller.signal),
          )
        : [];

    Promise.all([Promise.all(boothRequests), Promise.all(performanceRequests)])
      .then(([boothDayResults, performanceDayResults]) => {
        const uniqueItems = new Map();

        // 일반 부스 즐겨찾기
        boothDayResults
          .flat()
          .map(normalizeBooth)
          .forEach((booth) => {
            if (favoriteBoothIds.includes(booth.id)) {
              uniqueItems.set(booth.id, booth);
            }
          });

        // 공연 즐겨찾기
        performanceDayResults
          .flat()
          .map(normalizePerformance)
          .forEach((performance) => {
            if (favoritePerformanceIds.includes(performance.apiId)) {
              uniqueItems.set(performance.id, performance);
            }
          });

        setFavoriteBooths([...uniqueItems.values()]);
        setLoadState({
          key: requestKey,
          error: "",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setFavoriteBooths([]);

          setLoadState({
            key: requestKey,
            error:
              "찜한 부스와 공연을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
          });
        }
      });

    return () => controller.abort();
  }, [favoriteLoadKey, favorites, showFavorites]);
  useEffect(() => {
    if (!isFavoriteModalOpen) {
      return undefined;
    }

    const scrollContainer = document.querySelector(".mobile-content");

    if (!scrollContainer) {
      return undefined;
    }

    const previousOverflow = scrollContainer.style.overflow;

    scrollContainer.style.overflow = "hidden";

    return () => {
      scrollContainer.style.overflow = previousOverflow;
    };
  }, [isFavoriteModalOpen]);

  const runSearch = async (query, date) => {
    const currentRequestId = searchRequestId.current + 1;

    searchRequestId.current = currentRequestId;

    setIsSearching(true);
    setSearchError("");

    try {
      const results = await getBooths({
        date: API_DATES[date],
        keyword: query,
      });

      if (searchRequestId.current === currentRequestId) {
        setSearchResults(results.map(normalizeBooth));
      }
    } catch {
      if (searchRequestId.current === currentRequestId) {
        setSearchResults([]);
        setSearchError(
          "검색 결과를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
        );
      }
    } finally {
      if (searchRequestId.current === currentRequestId) {
        setIsSearching(false);
      }
    }
  };

  const toggleFavorite = (boothId) => {
    if (
      !favorites.includes(boothId) &&
      localStorage.getItem(FAVORITE_MODAL_CONFIRMED_KEY) !== "true"
    ) {
      setPendingFavorite(boothId);
      setIsFavoriteModalOpen(true);

      return;
    }

    if (favorites.includes(boothId)) {
      setFavoriteBooths((currentBooths) =>
        currentBooths.filter((booth) => booth.id !== boothId),
      );
    }

    setFavorites((currentFavorites) => {
      const nextFavorites = currentFavorites.includes(boothId)
        ? currentFavorites.filter((id) => id !== boothId)
        : [...currentFavorites, boothId];

      return nextFavorites;
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const nextQuery = searchTerm.trim();

    setShowFavorites(false);
    setSubmittedQuery(nextQuery);

    if (!nextQuery) {
      searchRequestId.current += 1;

      setSearchResults([]);
      setIsSearching(false);

      return;
    }

    runSearch(nextQuery, selectedDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    if (submittedQuery) {
      runSearch(submittedQuery, date);
    }
  };

  const hasSearched = submittedQuery.length > 0;
  const visibleBooths = booths;
  const activeLoadKey = showFavorites ? favoriteLoadKey : listLoadKey;
  const isBoothsLoading =
    !hasSearched &&
    !(showFavorites && favorites.length === 0) &&
    loadState.key !== activeLoadKey;
  const visibleBoothError = hasSearched
    ? searchError
    : loadState.key !== activeLoadKey
      ? ""
      : loadState.error;

  const openFavoritesFromModal = () => {
    localStorage.setItem(FAVORITE_MODAL_CONFIRMED_KEY, "true");

    if (pendingFavorite !== null) {
      setFavorites((currentFavorites) =>
        currentFavorites.includes(pendingFavorite)
          ? currentFavorites
          : [...currentFavorites, pendingFavorite],
      );
    }

    setPendingFavorite(null);
    setIsFavoriteModalOpen(false);

    setShowFavorites(true);
    setSelectedCategory(null);

    setSubmittedQuery("");
    setSearchTerm("");

    document.querySelector(".mobile-content")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelFavoriteFromModal = () => {
    setPendingFavorite(null);
    setIsFavoriteModalOpen(false);
  };

  return (
    <main className="booth-page">
      {/* 헤더 */}
      <header className="booth-header">
        <button
          className="booth-back-button"
          type="button"
          aria-label="홈으로 이동"
          onClick={() => navigate("/")}
        >
          <img src={backButton} alt="" />
        </button>

        <h1>부스소개</h1>
      </header>

      {/* 날짜 */}
      <section className="booth-date-selector" aria-label="날짜 선택">
        <DateButton
          date={29}
          selectedDate={selectedDate}
          onSelect={handleDateSelect}
        />

        <DateButton
          date={30}
          selectedDate={selectedDate}
          onSelect={handleDateSelect}
        />
      </section>

      {/* 검색 */}
      <form className="booth-search" role="search" onSubmit={handleSearch}>
        <div className="booth-search-input-wrap">
          <img
            className="booth-search-input-bg"
            src={searchBtn}
            alt=""
            aria-hidden="true"
          />

          <input
            aria-label="부스 검색어"
            autoComplete="off"
            enterKeyHint="search"
            inputMode="search"
            placeholder="검색어를 입력하세요"
            type="search"
            value={searchTerm}
            onChange={(event) => {
              const nextSearchTerm = event.target.value;

              setSearchTerm(nextSearchTerm);

              if (!nextSearchTerm.trim()) {
                searchRequestId.current += 1;

                setSubmittedQuery("");
                setSearchResults([]);
                setIsSearching(false);
              }
            }}
          />
        </div>

        <button className="booth-search-button" type="submit">
          <img src={defaultBtn} alt="" aria-hidden="true" />

          <span>검색</span>
        </button>
      </form>

      {/* 카테고리 */}
      {!hasSearched && (
        <nav className="booth-filters" aria-label="부스 종류 선택">
          {categories.map((category) => {
            const isSelected = selectedCategory === category && !showFavorites;

            return (
              <button
                key={category}
                className={`booth-filter-button ${
                  isSelected ? "is-selected" : ""
                }`}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowFavorites(false);
                }}
              >
                <img
                  className="booth-filter-bg"
                  src={isSelected ? selectedBtn : defaultBtn}
                  alt=""
                  aria-hidden="true"
                />

                <span>{category}</span>
              </button>
            );
          })}

          {/* 찜 버튼 */}
          <button
            className="booth-favorite-filter"
            type="button"
            aria-label="즐겨찾기"
            aria-pressed={showFavorites}
            onClick={() => {
              setShowFavorites(true);
              setSelectedCategory(null);
            }}
          >
            <img
              className="booth-filter-bg"
              src={showFavorites ? selectedBtn : defaultBtn}
              alt=""
              aria-hidden="true"
            />

            <span className="booth-filter-heart">♥</span>
          </button>
        </nav>
      )}
      {/* 공연소개 - 전체 타임라인 보기 */}
      {!hasSearched && !showFavorites && selectedCategory === "공연소개" && (
        <button
          className="booth-timeline-button"
          type="button"
          onClick={() => navigate("/performance/timetable")}
        >
          전체 타임라인 보기
        </button>
      )}

      {/* 부스 목록 */}
      <section className="booth-list" aria-live="polite">
        {visibleBoothError ? (
          <p className="booth-load-message booth-load-error">
            {visibleBoothError}
          </p>
        ) : hasSearched && isSearching ? (
          <p className="booth-searching">검색 중...</p>
        ) : hasSearched && searchResults.length === 0 ? (
          <div className="booth-empty-search">
            <img src={noSearchResults} alt="검색 결과가 없어요" />
          </div>
        ) : hasSearched ? (
          <div className="booth-search-results">
            <p>
              ‘{submittedQuery}’ 검색 결과 {searchResults.length}건
            </p>

            <div className="booth-search-result-grid">
              {searchResults.map((booth) => (
                <BoothCard
                  key={booth.id}
                  booth={booth}
                  isFavorite={favorites.includes(booth.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        ) : showFavorites && isBoothsLoading ? (
          <p className="booth-load-message">찜한 부스를 불러오는 중...</p>
        ) : showFavorites && favoriteBooths.length === 0 ? (
          <div className="booth-empty-favorites">
            <img src={bookmarkEmpty} alt="저장된 부스가 없어요" />
          </div>
        ) : showFavorites ? (
          <div className="favorite-booth-section">
            <p className="favorite-booth-guide">
              찜한 부스는 날짜와 관계없이 모두 확인할 수 있어요.
            </p>
            <div className="favorite-booth-list">
              {favoriteBooths.map((booth) => (
                <BoothCard
                  key={booth.id}
                  booth={booth}
                  isFavorite
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        ) : isBoothsLoading ? (
          <p className="booth-load-message">부스 목록을 불러오는 중...</p>
        ) : (
          <BoothListArtwork
            booths={visibleBooths}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      {/* 즐겨찾기 안내 모달 */}
      {isFavoriteModalOpen && (
        <div className="favorite-modal-backdrop">
          <div
            className="favorite-modal-dialog"
            role="dialog"
            aria-label="찜 안내"
            aria-modal="true"
          >
            <img src={favoritePopup} alt="" />

            <button
              className="favorite-modal-close"
              type="button"
              aria-label="찜 안내 닫기"
              onClick={cancelFavoriteFromModal}
            />

            <button
              className="favorite-modal-link"
              type="button"
              aria-label="찜 목록 보러 가기"
              onClick={openFavoritesFromModal}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default BoothAllPage;
