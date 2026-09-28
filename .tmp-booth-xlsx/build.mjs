import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/areteum/DW26ARETEUM_FE/outputs/booth-svg-extraction";
const outputPath = `${outputDir}/부스_목록_29일.xlsx`;
const previewPath = `${outputDir}/부스_목록_29일_미리보기.png`;

const booths = [
  [1, "일반 부스", "My Bias", "14:00~22:00", "동덕여대 운동장", ""],
  [2, "일반 부스", "인문잡지 영원", "14:00~19:00", "동덕여대 운동장", ""],
  [3, "일반 부스", "방굴방굴 군쟁이", "14:00~19:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [4, "일반 부스", "푸른자리 문구점", "13:00~19:00", "동덕여대 운동장", ""],
  [5, "일반 부스", "Som:core(솜코어)", "12:00~18:00", "동덕여대 운동장", ""],
  [6, "일반 부스", "외계인 침공시 귀여 빼고 다 잡아먹힌다", "13:00~18:00", "동덕여대 운동장", "부스명 원문 재확인 필요"],
  [7, "일반 부스", "기독연합", "14:00~18:00", "동덕여대 운동장", ""],
  [8, "일반 부스", "DDminor", "14:00~18:00", "동덕여대 운동장", "영문 대소문자 재확인 필요"],
  [9, "일반 부스", "사연 클릭커", "14:00~18:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [10, "일반 부스", "목화", "14:00~18:00", "동덕여대 운동장", ""],
  [11, "일반 부스", "EXTY", "14:00~18:00", "동덕여대 운동장", "영문 철자 재확인 필요"],
  [12, "일반 부스", "비전", "12:00~18:00", "동덕여대 운동장", ""],
  [13, "일반 부스", "한땀한땀 펠트 지갑", "13:00~18:00", "동덕여대 운동장", ""],
  [14, "일반 부스", "마레테움 온에어", "13:00~18:00", "동덕여대 운동장", ""],
  [15, "솜컬렉션", "달팽이 잡화점", "12:00~21:00", "동덕여대 운동장", ""],
  [16, "솜컬렉션", "럭키모솜", "12:00~21:00", "동덕여대 운동장", ""],
  [17, "솜컬렉션", "미확인문제", "12:00~21:00", "동덕여대 운동장", ""],
  [18, "솜컬렉션", "틸커룬", "15:00~21:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [19, "솜컬렉션", "휴메서 왔어요", "15:00~21:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [20, "솜컬렉션", "리본마을", "15:00~18:00", "동덕여대 운동장", ""],
  [21, "솜컬렉션", "반짝놀이", "18:00~21:00", "동덕여대 운동장", ""],
  [22, "솜컬렉션", "MOTIF", "12:00~18:00", "동덕여대 운동장", "영문 철자 재확인 필요"],
  [23, "솜컬렉션", "moss404", "15:00~18:00", "동덕여대 운동장", ""],
  [24, "솜컬렉션", "어서모솜", "15:00~18:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [25, "솜컬렉션", "ideal.", "12:00~18:00", "동덕여대 운동장", "영문 대소문자 재확인 필요"],
  [26, "축운위", "솜체크인", "12:00~22:00", "동덕여대 운동장", ""],
  [27, "축운위", "부스씨전", "12:00~22:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [28, "축운위", "솜품샵", "11:00~22:00", "동덕여대 운동장", ""],
  [29, "축운위", "포토부스", "12:00~22:00", "동덕여대 운동장", ""],
  [30, "축운위", "솜네마", "12:00~22:00", "동덕여대 운동장", ""],
  [31, "축운위", "솜솜냠냠", "12:00~22:00", "동덕여대 운동장", ""],
  [32, "축운위", "럭키런 솜드롭", "12:00~22:00", "동덕여대 운동장", ""],
  [33, "축운위", "솜 PICK! 팔찌메이커", "12:00~22:00", "동덕여대 운동장", ""],
  [34, "축운위", "솜침코", "12:00~22:00", "동덕여대 운동장", ""],
  [35, "축운위", "솜솜포차 총괄운영", "12:00~22:00", "동덕여대 운동장", ""],
  [36, "푸드트럭", "커피스토리로드 카페", "12:00~22:00", "동덕여대 민주광장", ""],
  [37, "푸드트럭", "와미", "12:00~22:00", "동덕여대 민주광장", "부스명 철자 재확인 필요"],
  [38, "푸드트럭", "쏘굿", "12:00~22:00", "동덕여대 민주광장", ""],
  [39, "푸드트럭", "부엉이푸드", "12:00~22:00", "동덕여대 민주광장", ""],
  [40, "푸드트럭", "메리푸드", "12:00~22:00", "동덕여대 민주광장", ""],
  [41, "푸드트럭", "다온푸드", "12:00~22:00", "동덕여대 민주광장", ""],
  [42, "주점", "듀리스 로마 신화 -솜들의 만찬-", "16:00~22:00", "동덕여대 운동장", ""],
  [43, "주점", "775_깡!(재)주점", "16:00~22:00", "동덕여대 운동장", "부스명 원문 재확인 필요"],
  [44, "주점", "얼의 라면가게", "16:00~22:00", "동덕여대 운동장", "부스명 첫 글자 재확인 필요"],
  [45, "주점", "평범한 솜솜이가 회귀했더니 공주가 되어버렸습니다!", "16:00~22:00", "동덕여대 운동장", ""],
  [46, "공연", "한소리", "18:05", "동덕여대 동인관", ""],
  [47, "공연", "김명현", "18:34", "동덕여대 동인관", ""],
  [48, "공연", "2003년 6월에 생긴 일", "18:48", "동덕여대 동인관", ""],
  [49, "공연", "환경동 평화문제 연합회", "19:08", "동덕여대 동인관", "공연명 띄어쓰기 재확인 필요"],
  [50, "공연", "전유진", "19:30", "동덕여대 동인관", ""],
  [51, "공연", "세이마이네임", "20:00", "동덕여대 동인관", ""],
  [52, "공연", "이즈나", "20:35", "동덕여대 동인관", ""],
  [53, "공연", "윤하", "21:10", "동덕여대 동인관", ""],
];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("29일 부스 목록");
sheet.showGridLines = false;
sheet.tabColor = "#C64F87";

sheet.getRange("A2:F2").merge();
sheet.getRange("A2").values = [["9월 29일 부스 목록"]];
sheet.getRange("A2").format = {
  font: { name: "Arial", size: 15, bold: true, color: "#3B1728" },
  verticalAlignment: "center",
};
sheet.getRange("A2:F2").format.rowHeight = 28;

sheet.getRange("A3:F3").merge();
sheet.getRange("A3").values = [["원본: all_1.svg · SVG 경로를 카드별로 판독 · 검수 메모가 있는 항목은 원문 확인 필요"]];
sheet.getRange("A3").format = {
  font: { name: "Arial", size: 9, italic: true, color: "#6B5A63" },
};

sheet.getRange("A5:B5").values = [["총 부스", booths.length]];
sheet.getRange("A5:B5").format = {
  fill: "#FDE1EF",
  font: { name: "Arial", size: 10, bold: true, color: "#6A2345" },
  borders: { preset: "outside", style: "thin", color: "#E5A3C2" },
  verticalAlignment: "center",
};

const headers = [["번호", "구분", "부스명", "시간", "위치", "검수 메모"]];
sheet.getRange("A7:F7").values = headers;
sheet.getRange("A8:F60").values = booths;

const table = sheet.tables.add("A7:F60", true, "BoothList29");
table.style = "TableStyleMedium2";
table.showFilterButton = true;
table.showBandedRows = true;

sheet.getRange("A7:F7").format = {
  fill: "#B94E7F",
  font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: {
    insideVertical: { style: "thin", color: "#F6D5E5" },
    bottom: { style: "medium", color: "#8D315C" },
  },
};

sheet.getRange("A8:F60").format.font = { name: "Arial", size: 10, color: "#262126" };
sheet.getRange("A8:F60").format.verticalAlignment = "center";
sheet.getRange("A8:B60").format.horizontalAlignment = "center";
sheet.getRange("D8:D60").format.horizontalAlignment = "center";
sheet.getRange("C8:C60").format.wrapText = true;
sheet.getRange("F8:F60").format.wrapText = true;
sheet.getRange("F8:F60").format.font = { name: "Arial", size: 9, color: "#8A5200" };

sheet.getRange("A8:F60").conditionalFormats.addCustom('=$F8<>""', {
  fill: "#FFF4CE",
});

sheet.getRange("A:A").format.columnWidth = 8;
sheet.getRange("B:B").format.columnWidth = 14;
sheet.getRange("C:C").format.columnWidth = 42;
sheet.getRange("D:D").format.columnWidth = 18;
sheet.getRange("E:E").format.columnWidth = 23;
sheet.getRange("F:F").format.columnWidth = 30;
sheet.getRange("A7:F7").format.rowHeight = 24;
sheet.getRange("A8:F60").format.rowHeight = 31;
sheet.freezePanes.freezeRows(7);

workbook.recalculate();

const inspect = await workbook.inspect({
  kind: "table",
  sheetId: sheet.name,
  range: "A2:F60",
  include: "values,formulas",
  tableMaxRows: 60,
  tableMaxCols: 6,
  maxChars: 20000,
});
console.log("INSPECT_START");
console.log(inspect.ndjson);
console.log("INSPECT_END");

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log("ERROR_SCAN_START");
console.log(errors.ndjson);
console.log("ERROR_SCAN_END");

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({
  sheetName: sheet.name,
  range: "A1:F25",
  scale: 1.25,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`OUTPUT=${outputPath}`);
console.log(`PREVIEW=${previewPath}`);
