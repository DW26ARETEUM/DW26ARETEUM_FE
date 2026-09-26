import locationImage from "../assets/images/boothMap/somCollection/12.png";

const snailShopItems = [
  { name: "봉봉드롭 스티커", price: 3000 },
  { name: "일반 스티커", price: 1500 },
  { name: "엽서", price: 1500 },
  { name: "종이 책갈피", price: 1500 },
  { name: "랜덤 피규어", price: 6500 },
  { name: "말랑이 & 슬랑이 & 스퀴시", price: 4500 },
  { name: "왁뿌볼", price: 3000 },
  { name: "틴케이스", price: 7000 },
  { name: "비즈 팔찌", price: 6000 },
  { name: "비즈 키링", price: 4000 },
  { name: "비즈 책갈피", price: 6000 },
  { name: "핸드메이드 뜨개 용품", price: 6500 },
  { name: "핸드메이드 바느질 소품", price: 6500 },
  { name: "선물 포장용 봉투", price: 1500 },
];

const extraItems = Array.from({ length: 8 }, (_, index) => ({
  name: `품목 ${index + 1}`,
  price: 1000 * (index + 1),
}));

export const SOM_COLLECTION_BOOTHS = {
  29: [
    {
      id: 1,
      category: "솜컬렉션",
      name: "달팽이 잡화점",
      date: "9/29 - 9/30",
      time: "12:00 ~ 21:00 / 12:00 ~ 21:00",
      location: "동덕여대 운동장 - 솜컬렉션 1번",
      operator: "개인 운영",
      locationImage,
      items: [...snailShopItems, ...extraItems],
    },
    {
      id: 2,
      category: "솜컬렉션",
      name: "럭키보울",
      date: "9/29",
      time: "12:00 ~ 21:00",
      location: "동덕여대 운동장 - 솜컬렉션 2번",
      operator: "개인 운영",
      locationImage,
      items: [
        { name: "럭키 키링", price: 5000 },
        { name: "럭키 스티커 팩", price: 2000 },
        { name: "행운 부적 엽서", price: 1500 },
      ],
    },
  ],
  30: [
    {
      id: 1,
      category: "솜컬렉션",
      name: "달팽이 잡화점",
      date: "9/29 - 9/30",
      time: "12:00 ~ 21:00 / 12:00 ~ 21:00",
      location: "동덕여대 운동장 - 솜컬렉션 1번",
      operator: "개인 운영",
      locationImage,
      items: [...snailShopItems.slice(0, 10), ...extraItems],
    },
    {
      id: 3,
      category: "솜컬렉션",
      name: "솜솜 공방",
      date: "9/30",
      time: "12:00 ~ 21:00",
      location: "동덕여대 운동장 - 솜컬렉션 3번",
      operator: "개인 운영",
      locationImage,
      items: [],
    },
  ],
};
