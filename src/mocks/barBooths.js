import isecLocationImage from "../assets/images/boothMap/bar/1.png";
import isecLogo from "../assets/images/boothMap/bar/icon1.svg";
import kkangLocationImage from "../assets/images/boothMap/bar/2.png";
import kkangLogo from "../assets/images/boothMap/bar/icon2.svg";

const isecMenu = [
  { name: "김치전", price: 6000 },
  { name: "짜계치", price: 6000 },
  { name: "팬케이크", price: 6000 },
  { name: "치즈시즈닝팝콘", price: 6000 },
  { name: "사이다", price: 3000 },
  {
    name: "세트메뉴1",
    price: 20000,
    description: "김치전+어묵탕+짜계치+치즈시즈닝팝콘",
  },
  {
    name: "세트메뉴2",
    price: 15000,
    description: "어묵탕+짜계치+치즈시즈닝팝콘",
  },
  {
    name: "세트메뉴3",
    price: 15000,
    description: "김치전+어묵탕+치즈시즈닝팝콘",
  },
];

export const BAR_BOOTHS = [
  {
    id: 1,
    category: "주점",
    organization: "아이섹",
    name: "듀리스 로마신화 -솜들의 만찬-",
    location: "동덕여대 운동장 - 주점 1번",
    operator: "아이섹",
    locationImage: isecLocationImage,
    logo: isecLogo,
    schedules: {
      29: {
        date: "9/29",
        time: "16:00~22:00",
        menu: isecMenu,
      },
      30: {
        date: "9/30",
        time: "16:00~22:00",
        menu: [
          ...isecMenu.slice(0, 4),
          { name: "콘치즈", price: 5000 },
          ...isecMenu.slice(4),
        ],
      },
    },
  },
  {
    id: 2,
    category: "주점",
    organization: "중앙영화제작동아리 ㄲ5",
    name: "깡!(패) 주점",
    location: "동덕여대 운동장 - 주점 2번",
    operator: "ㄲ5",
    locationImage: kkangLocationImage,
    logo: kkangLogo,
    schedules: {
      29: {
        date: "9/29",
        time: "16:00~22:00",
        menu: [
          { name: "짜파구리+대패삼겹살", price: 10000 },
          { name: "어묵탕", price: 6000 },
          { name: "군만두", price: 5000 },
          { name: "순두부 열라면", price: 5000 },
          { name: "황도", price: 4000 },
        ],
      },
    },
  },
];
