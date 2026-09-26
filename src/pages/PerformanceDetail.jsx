import "../styles/PerformanceDetail.css";
import background from "../assets/images/background/home.png";
import popup from "../assets/images/boothDetail.png";
import backButton from "../assets/images/backbtn.svg";
import homeButton from "../assets/images/homebtn.svg";
import musicStaff from "../assets/images/booth/musicStaff.svg";
import dancers from "../assets/images/booth/dancers.svg";
import dateIcon from "../assets/images/booth/date.svg";
import timeIcon from "../assets/images/booth/time.svg";
import locationIcon from "../assets/images/booth/location.svg";
import personIcon from "../assets/images/booth/person.svg";

// 공연 사진이 저장된 폴더의 파일을 읽기
const imageFiles = import.meta.glob(
  "../assets/images/booth/performances/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, query: "?url", import: "default" },
);

// 현재는 화면 확인용 데이터입니다. 공연타임테이블과 같은 순서입니다.
// 수정: 피그마와 제목이 다른 공연에는 displayTitle을 추가했습니다.
// 수정: 전유진과 박기영에는 상단 표시용 categoryLabel을 추가했습니다.
// TODO(백엔드 완료 후): 제목·날짜·시간·분류·출연자·장소를 상세 API 응답으로 교체합니다.
// TODO(백엔드 완료 후): imageFile만 별도 매핑으로 옮깁니다. ID가 안정적으로 유지되는지 확인한 뒤 ID 기준 매핑을 결정합니다.
const previewPerformances = {
  29: [
    {
      title: "한소리",
      startTime: "18:05",
      endTime: "18:30",
      category: "CLUB",
      performer: "동아리_한소리",
      imageFile: "29-hansori.png",
    },
    {
      title: "김명현",
      startTime: "18:34",
      endTime: "18:45",
      category: "EVENT",
      performer: "일반_김명현",
      imageFile: "29-kim-myeonghyeon.png",
    },
    {
      title: "2003년 6월에 생긴 일",
      startTime: "18:48",
      endTime: "19:03",
      category: "EVENT",
      performer: "일반_2003년 6월에 생긴 일",
      imageFile: "29-2003-june.png",
    },
    {
      title: "합정동 평화유지연합회",
      displayTitle: "합정동\n평화유지연합회",
      startTime: "19:08",
      endTime: "19:25",
      category: "EVENT",
      performer: "일반_합정동 평화유지연합회",
      imageFile: "29-hapjeongdong.png",
    },
    {
      title: "전유진",
      startTime: "19:30",
      endTime: "19:50",
      category: "ARTIST",
      categoryLabel: "스페셜 스테이지",
      performer: "스페셜 스테이지_전유진",
      imageFile: "29-jeon-yujin.png",
    },
    {
      title: "세이마이네임",
      displayTitle: "SAY MY NAME\n세이마이네임",
      startTime: "20:00",
      endTime: "20:30",
      category: "ARTIST",
      performer: "아티스트_세이마이네임",
      imageFile: "29-say-my-name.png",
    },
    {
      title: "이즈나",
      displayTitle: "izna\n이즈나",
      startTime: "20:35",
      endTime: "21:05",
      category: "ARTIST",
      performer: "아티스트_이즈나",
      imageFile: "29-izna.png",
    },
    {
      title: "윤하",
      displayTitle: "Younha\n윤하",
      startTime: "21:10",
      endTime: "21:50",
      category: "ARTIST",
      performer: "아티스트_윤하",
      imageFile: "29-younha.png",
    },
  ],
  30: [
    {
      title: "소울엔지",
      startTime: "18:05",
      endTime: "18:25",
      category: "CLUB",
      performer: "동아리_소울엔지",
      imageFile: "30-soul-ng.png",
    },
    {
      title: "엑스터시",
      startTime: "18:30",
      endTime: "18:50",
      category: "CLUB",
      performer: "동아리_엑스터시",
      imageFile: "30-extasy.png",
    },
    {
      title: "얼사랑",
      startTime: "18:55",
      endTime: "19:15",
      category: "CLUB",
      performer: "동아리_얼사랑",
      imageFile: "30-ullove.png",
    },
    {
      title: "오월",
      startTime: "19:20",
      endTime: "19:30",
      category: "EVENT",
      performer: "일반_오월",
      imageFile: "30-may.png",
    },
    {
      title: "박기영",
      startTime: "19:30",
      endTime: "19:50",
      category: "ARTIST",
      categoryLabel: "스페셜 스테이지",
      performer: "스페셜 스테이지_박기영",
      imageFile: "30-park-kiyoung.png",
    },
    {
      title: "체리필터",
      displayTitle: "CherryFilter\n체리필터",
      startTime: "20:05",
      endTime: "20:40",
      category: "ARTIST",
      performer: "아티스트_체리필터",
      imageFile: "30-cherry-filter.png",
    },
    {
      title: "청하",
      displayTitle: "CHUNG HA\n청하",
      startTime: "20:45",
      endTime: "21:20",
      category: "ARTIST",
      performer: "아티스트_청하",
      imageFile: "30-chungha.png",
    },
    {
      title: "스테이씨",
      displayTitle: "STAYC\n스테이씨",
      startTime: "21:25",
      endTime: "22:00",
      category: "ARTIST",
      performer: "아티스트_스테이씨",
      imageFile: "30-stayc.png",
    },
  ],
};

const categoryLabels = {
  ARTIST: "아티스트",
  CLUB: "동아리 공연",
  EVENT: "일반 공연",
};

const stagePreview = "동덕여대 동인관 체육관";

// 피그마 기준 255×170px 사진들
const widePhotoFiles = new Set([
  "29-izna.png",
  "29-say-my-name.png",
  "30-cherry-filter.png",
  "30-stayc.png",
]);

// day와 index(0~7)로 현재 보여 줄 공연을 선택합니다.
// TODO(백엔드 완료 후): 공연 ID를 받아 GET /api/v1/performances/{performanceId} 응답으로 화면을 표시합니다.
export default function PerformanceDetail({
  day = 29,
  index = 0,
  onBack,
  onHome,
}) {
  const performance = previewPerformances[day]?.[index];

  const imagePath =
    performance &&
    `../assets/images/booth/performances/${performance.imageFile}`;

  const image = imageFiles[imagePath];

  return (
    <main
      className="performance-detail"
      style={{ backgroundImage: `url(${background})` }}
    >
      <header className="performance-detail__header">
        <button
          className="performance-detail__nav performance-detail__nav--back"
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <img src={backButton} alt="" />
        </button>

        <h1>부스상세</h1>

        <button
          className="performance-detail__nav performance-detail__nav--home"
          type="button"
          onClick={onHome}
          aria-label="홈으로"
        >
          <img src={homeButton} alt="" />
        </button>
      </header>

      <section
        className="performance-detail__popup"
        aria-label="공연 상세 정보"
      >
        <img className="performance-detail__frame" src={popup} alt="" />

        {!performance ? (
          <p className="performance-detail__message">공연 정보가 없습니다.</p>
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
                {performance.categoryLabel ||
                  categoryLabels[performance.category]}
              </p>
              <h2>{performance.displayTitle || performance.title}</h2>
            </div>

            {image && (
              <img
                className={`performance-detail__photo${
                  widePhotoFiles.has(performance.imageFile)
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
                <dd>{stagePreview}</dd>
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
      </section>
    </main>
  );
}
