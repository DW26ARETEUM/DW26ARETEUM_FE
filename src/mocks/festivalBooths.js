import checkInLocationImage from "../assets/images/boothMap/festival/1.png";
import shopLocationImage from "../assets/images/boothMap/festival/3.png";

export const FESTIVAL_BOOTHS = [
  {
    id: 1,
    category: "축운위 부스",
    name: "솜체크인",
    date: "9/29 - 9/30",
    time: "12:00~22:00 / 12:00~22:00",
    location: "동덕여대 운동장 - 축운위 1번",
    operator: "동덕여대 축제운영위원회",
    locationImage: checkInLocationImage,
    description: "",
  },
  {
    id: 3,
    category: "축운위 부스",
    name: "솜품샵",
    date: "9/29 - 9/30",
    time: "12:00~22:00 / 12:00~22:00",
    location: "동덕여대 운동장 - 축운위 3번",
    operator: "동덕여대 축제운영위원회",
    locationImage: shopLocationImage,
    description:
      "플리마켓 형식으로 진행되는 공간. 학우들의 추억과 취향이 담긴 물건들이 중심이 되어 따뜻한 교류와 특별한 발견을 경험할 수 있습니다.",
  },
];
