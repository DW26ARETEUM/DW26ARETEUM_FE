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

import { booths29 } from "../data/booths29.js";
import { booths30 } from "../data/booths30.js";
import { searchBooths } from "../services/boothSearch.js";

import "./BoothAllPage.css";

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

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    return savedFavorites ? JSON.parse(savedFavorites) : [];
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

function HeartButton({ cardIndex, date, isFavorite, onToggle, style }) {
  return (
    <button
      className="booth-heart-button"
      type="button"
      style={style}
      aria-label={`${date}일 ${cardIndex + 1}번 부스 ${
        isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"
      }`}
      aria-pressed={isFavorite}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        onToggle(date, cardIndex);
      }}
    >
      <img src={isFavorite ? heartSelected : heartDefault} alt="" />
    </button>
  );
}

const categoryLabels = {
  일반부스: "일반 부스",
  공연소개: "공연",
};

function BoothCard({ booth, isFavorite, onToggleFavorite }) {
  return (
    <article className="booth-data-card">
      <Link
        className="booth-card-link"
        to={`/booths/${booth.id}`}
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
        cardIndex={booth.cardIndex}
        date={booth.date}
        isFavorite={isFavorite}
        onToggle={onToggleFavorite}
      />
    </article>
  );
}

function BoothListArtwork({ category, date, favorites, onToggleFavorite }) {
  const dayBooths = date === 29 ? booths29 : booths30;

  const selectedCategory = categoryLabels[category] ?? category;

  const visibleBooths =
    category === "전체"
      ? dayBooths
      : dayBooths.filter((booth) => booth.category === selectedCategory);

  return (
    <div className="booth-data-grid">
      {visibleBooths.map((booth) => (
        <BoothCard
          key={booth.id}
          booth={booth}
          isFavorite={favorites.includes(`${date}-${booth.cardIndex}`)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

function FavoriteCard({ cardIndex, date, onToggleFavorite }) {
  const booth = (date === 29 ? booths29 : booths30)[cardIndex];

  return booth ? (
    <BoothCard booth={booth} isFavorite onToggleFavorite={onToggleFavorite} />
  ) : null;
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

  const searchRequestId = useRef(0);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

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

    try {
      const results = await searchBooths({
        query,
        date,
      });

      if (searchRequestId.current === currentRequestId) {
        setSearchResults(results);
      }
    } finally {
      if (searchRequestId.current === currentRequestId) {
        setIsSearching(false);
      }
    }
  };

  const selectedDateFavorites = favorites
    .filter((favoriteKey) => favoriteKey.startsWith(`${selectedDate}-`))
    .map((favoriteKey) => Number(favoriteKey.split("-")[1]));

  const toggleFavorite = (date, cardIndex) => {
    const favoriteKey = `${date}-${cardIndex}`;

    if (
      !favorites.includes(favoriteKey) &&
      localStorage.getItem(FAVORITE_MODAL_CONFIRMED_KEY) !== "true"
    ) {
      setPendingFavorite(favoriteKey);

      setIsFavoriteModalOpen(true);

      return;
    }

    setFavorites((currentFavorites) =>
      currentFavorites.includes(favoriteKey)
        ? currentFavorites.filter((item) => item !== favoriteKey)
        : [...currentFavorites, favoriteKey],
    );
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

  const openFavoritesFromModal = () => {
    localStorage.setItem(FAVORITE_MODAL_CONFIRMED_KEY, "true");

    if (pendingFavorite) {
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
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
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
        {/* 검색 입력창 */}
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

        {/* 검색 버튼 */}
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

      {/* 부스 목록 */}
      <section className="booth-list" aria-live="polite">
        {hasSearched && isSearching ? (
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
                  isFavorite={favorites.includes(
                    `${booth.date}-${booth.cardIndex}`,
                  )}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        ) : showFavorites && selectedDateFavorites.length === 0 ? (
          <div className="booth-empty-favorites">
            <img src={bookmarkEmpty} alt="저장된 부스가 없어요" />
          </div>
        ) : showFavorites ? (
          <div className="favorite-booth-list">
            {selectedDateFavorites.map((cardIndex) => (
              <FavoriteCard
                key={`${selectedDate}-${cardIndex}`}
                cardIndex={cardIndex}
                date={selectedDate}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <BoothListArtwork
            category={selectedCategory}
            date={selectedDate}
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
