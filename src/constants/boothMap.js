import boothDefault from "../assets/images/boothMap/boothDefalut.png";
import foodDefault from "../assets/images/boothMap/foodDefault.png";
import generalBoothSelected from "../assets/images/boothMap/generalBoothSelected.png";
import somCollectionSelected from "../assets/images/boothMap/somCollectionSelected.png";
import festivalSelected from "../assets/images/boothMap/festivalSelected.png";
import foodSelected from "../assets/images/boothMap/foodSelected.png";
import barSelected from "../assets/images/boothMap/barSelected.png";

export const DAYS = [29, 30];

// 카테고리별 지도(1: 본 행사장, 2: 푸드트럭 구역)와 상세 경로
export const CATEGORIES = [
  {
    key: "all",
    label: "전체",
    maps: [boothDefault, foodDefault],
  },
  {
    key: "general",
    label: "일반부스",
    maps: [generalBoothSelected, foodDefault],
    getPath: (day, id) => `/booth/general/${day}/${id}`,
  },
  {
    key: "somCollection",
    label: "솜컬렉션",
    maps: [somCollectionSelected, foodDefault],
    getPath: (day, id) => `/booth/som-collection/${day}/${id}`,
  },
  {
    key: "festival",
    label: "축운위",
    maps: [festivalSelected, foodDefault],
    getPath: (day, id) => `/booth/festival/${id}`,
  },
  {
    key: "food",
    label: "푸드트럭",
    maps: [boothDefault, foodSelected],
    initialSlide: 1,
    getPath: () => "/foodtruck/detail",
  },
  {
    key: "bar",
    label: "주점",
    maps: [barSelected, foodDefault],
    getPath: (day, id) => `/booth/bar/${day}/${id}`,
  },
];

const FESTIVAL_BOOTHS = [
  "솜체크인",
  "부스지원",
  "솜품샵",
  "포토부스",
  "솜네마",
  "솜솜냠냠",
  "럭키걸 솜드롬",
  "솜 PICK! 팔찌메이커",
  "솜칭코",
  "솜솜포차 총괄운영",
];

// 날짜·카테고리별 부스 목록 (배열 순서 = 지도 번호)
export const BOOTH_LIST = {
  general: {
    29: [
      "[개인] My Bias",
      "[창업동아리 영원회귀] 인문잡지 영원",
      "[방구석 글쟁이] 방글방글 글쟁이",
      "[푸른자리] 푸른자리 문구점",
      "[개인] Som:core(솜코어)",
      "[성소수자 동아리 코튼캔디]\n외계인침공 시 퀴어 빼고 다 잡아먹힌다",
      "[기독연합] 기독연합",
      "[창업동아리] 00minor",
      "[개인] 사얀 클릭커",
      "[교지편집위원회] 목화",
      "[회화과 전시동아리] EXTY",
      "[개인] 비전",
      "[총학생회 위드] 한땀한땀 펠트 지갑",
      "[교육 방송국 DEBS] 아레테움 온에어",
    ],
    30: [
      "[개인] My Bias",
      "[창업동아리 영원회귀] 인문잡지 영원",
      "[솜나이스] 솜솜이네 마음세탁소",
      "[푸른자리] 푸른자리 문구점",
      "[국립정신건강센터 서포터즈] 마주해요위크",
      "[성소수자 동아리 코튼캔디]\n외계인침공 시 퀴어 빼고 다 잡아먹힌다",
      "[기독연합] 기독연합",
      "[홍보대사 동그라미] 동그라미",
      "[개인] 사얀 클릭커",
      "[교지편집위원회] 목화",
      "[회화과 전시동아리] EXTY",
      "[한국건강증진원 서포터즈] 솜술병원",
      "[총학생회 위드] 한땀한땀 펠트 지갑",
      "[교육 방송국 DEBS] 아레테움 온에어",
    ],
  },
  somCollection: {
    29: [
      "달팽이잡화점",
      "럭키보울",
      "미확인물체",
      "팅커롱",
      "흙에서 왔어요",
      "리본야호",
      "반짝냥이",
      "MOTIF",
      "moss404",
      "어서오솜",
      "ideal",
    ],
    30: [
      "달팽이잡화점",
      "럭키보울",
      "Lucky flower",
      "팅커롱",
      "흙에서 왔어요",
      "반짝냥이",
      "MOTIF",
      "moss404",
      "어서오솜",
      "말랑뽑뽑",
    ],
  },
  festival: {
    29: FESTIVAL_BOOTHS,
    30: FESTIVAL_BOOTHS,
  },
  food: {
    29: [
      "커피스토리로드카페",
      "와이",
      "쏘굿",
      "부엉이푸드",
      "메리푸드",
      "다온푸드",
    ],
    30: [
      "부엉이푸드",
      "다온푸드",
      "메리푸드",
      "커피스토리로드카페",
      "와이",
      "쏘굿",
    ],
  },
  bar: {
    29: [
      "[동덕여대 아이섹]\n듀리스 로마 신화 -솜들의 만찬-",
      "[동덕여대 중앙 영화 제작동아리]\nㄲ5_깡!(패)주점",
      "[동덕여대 중앙 밴드 동아리 얼사랑]\n얼의 라면가게",
      "[동덕여대 인문대학 학생회]\n평범한 솜솜이가 회귀했더니\n공주가 되어버렸습니다!",
    ],
    30: [
      "[동덕여대 아이섹]\n듀리스 로마 신화 -솜들의 만찬-",
      "[동덕여대 중앙 영화 제작동아리]\nㄲ5_깡!(패)주점",
      "[동덕여대 래디컬 페미니즘 동아리 SIREN]\n싸우는 여자가 마신다",
      "[동덕여대 총학생회]\n위드상사",
    ],
  },
};
