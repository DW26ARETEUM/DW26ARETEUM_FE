import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/areteum/DW26ARETEUM_FE/outputs/booth-svg-extraction/부스_목록_29일.xlsx";
const outputDir = "C:/areteum/DW26ARETEUM_FE/outputs/booth-svg-extraction";
const outputPath = `${outputDir}/부스_목록_29일_30일.xlsx`;
const previewPath = `${outputDir}/부스_목록_30일_미리보기.png`;

const booths = [
  [1, "일반 부스", "My Bias", "14:00~22:00", "동덕여대 운동장", ""],
  [2, "일반 부스", "인문잡지 영원", "14:00~19:00", "동덕여대 운동장", ""],
  [3, "일반 부스", "솜솜이네 마음세탁소", "14:00~18:00", "동덕여대 운동장", ""],
  [4, "일반 부스", "푸른자리 문구점", "13:00~19:00", "동덕여대 운동장", ""],
  [5, "일반 부스", "마주해요워크", "14:00~18:00", "동덕여대 운동장", "부스명 띄어쓰기 재확인 필요"],
  [6, "일반 부스", "외계인 침공시 귀여 빼고 다 잡아먹힌다", "13:00~18:00", "동덕여대 운동장", "부스명 원문 재확인 필요"],
  [7, "일반 부스", "기독연합", "12:00~18:00", "동덕여대 운동장", ""],
  [8, "일반 부스", "동그라미", "14:00~18:00", "동덕여대 운동장", ""],
  [9, "일반 부스", "사연 클릭커", "14:00~18:00", "동덕여대 운동장", ""],
  [10, "일반 부스", "목화", "14:00~18:00", "동덕여대 운동장", ""],
  [11, "일반 부스", "EXTY", "14:00~18:00", "동덕여대 운동장", "영문 철자 재확인 필요"],
  [12, "일반 부스", "솜솜병원", "13:00~18:00", "동덕여대 운동장", ""],
  [13, "일반 부스", "한땀한땀 펠트 지갑", "13:00~18:00", "동덕여대 운동장", ""],
  [14, "일반 부스", "아레테움 온에어", "13:00~18:00", "동덕여대 운동장", ""],
  [15, "솜컬렉션", "달팽이 잡화점", "12:00~21:00", "동덕여대 운동장", ""],
  [16, "솜컬렉션", "럭키보숲", "12:00~21:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [17, "솜컬렉션", "Lucky Flower", "12:00~21:00", "동덕여대 운동장", ""],
  [18, "솜컬렉션", "틸;톤", "12:00~21:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [19, "솜컬렉션", "휴대서 찾아요", "15:00~18:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [20, "솜컬렉션", "반짝놀이", "18:00~21:00", "동덕여대 운동장", ""],
  [21, "솜컬렉션", "MOTIF", "12:00~18:00", "동덕여대 운동장", ""],
  [22, "솜컬렉션", "moss404", "15:00~18:00", "동덕여대 운동장", ""],
  [23, "솜컬렉션", "어서모솜", "13:00~18:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [24, "솜컬렉션", "말랑뿜뿜", "12:00~18:00", "동덕여대 운동장", ""],
  [25, "축운위", "솜체크인", "12:00~22:00", "동덕여대 운동장", ""],
  [26, "축운위", "부스지원", "12:00~22:00", "동덕여대 운동장", ""],
  [27, "축운위", "솜품샵", "12:00~22:00", "동덕여대 운동장", ""],
  [28, "축운위", "포토부스", "12:00~22:00", "동덕여대 운동장", ""],
  [29, "축운위", "솜네마", "12:00~22:00", "동덕여대 운동장", ""],
  [30, "축운위", "솜솜냠냠", "12:00~22:00", "동덕여대 운동장", ""],
  [31, "축운위", "럭키권 솜드롬", "12:00~22:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [32, "축운위", "솜 PICK! 팔찌메이커", "12:00~22:00", "동덕여대 운동장", ""],
  [33, "축운위", "솜칭코", "12:00~22:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [34, "축운위", "솜솜포차 축관운영", "12:00~22:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [35, "푸드트럭", "부엉이푸드", "12:00~22:00", "동덕여대 민주광장", ""],
  [36, "푸드트럭", "다온푸드", "12:00~22:00", "동덕여대 민주광장", ""],
  [37, "푸드트럭", "메리푸드", "12:00~22:00", "동덕여대 민주광장", ""],
  [38, "푸드트럭", "커피스토리로드 카페", "12:00~22:00", "동덕여대 민주광장", ""],
  [39, "푸드트럭", "와이", "12:00~22:00", "동덕여대 민주광장", ""],
  [40, "푸드트럭", "쏘굿", "12:00~22:00", "동덕여대 민주광장", ""],
  [41, "주점", "듀리스 로마 신화 -솜들의 만찬-", "16:00~22:00", "동덕여대 운동장", ""],
  [42, "주점", "775_깡!(때)주점", "16:00~22:00", "동덕여대 운동장", "부스명 원문 재확인 필요"],
  [43, "주점", "싸우는 여자가 마신다", "16:00~22:00", "동덕여대 운동장", ""],
  [44, "주점", "위드쌈싸", "16:00~22:00", "동덕여대 운동장", "부스명 철자 재확인 필요"],
  [45, "공연", "소울엔지", "18:05", "동덕여대 동인관", "부스명 철자 재확인 필요"],
  [46, "공연", "헥스터씨", "18:30", "동덕여대 동인관", "부스명 철자 재확인 필요"],
  [47, "공연", "열사랑", "18:55", "동덕여대 동인관", ""],
  [48, "공연", "모원", "19:20", "동덕여대 동인관", ""],
  [49, "공연", "박기영", "19:30", "동덕여대 동인관", ""],
  [50, "공연", "체리필터", "20:05", "동덕여대 동인관", ""],
  [51, "공연", "청하", "20:45", "동덕여대 동인관", ""],
  [52, "공연", "스테이씨", "21:25", "동덕여대 동인관", ""],
];

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sheet = workbook.worksheets.add("30일 부스 목록");
sheet.showGridLines = false;
sheet.tabColor = "#E671A6";

sheet.getRange("A2:F2").merge();
sheet.getRange("A2").values = [["9월 30일 부스 목록"]];
sheet.getRange("A2").format = { font: { name: "Arial", size: 15, bold: true, color: "#3B1728" }, verticalAlignment: "center" };
sheet.getRange("A2:F2").format.rowHeight = 28;
sheet.getRange("A3:F3").merge();
sheet.getRange("A3").values = [["원본: all_2.svg · SVG 경로를 카드별로 판독 · 검수 메모가 있는 항목은 원문 확인 필요"]];
sheet.getRange("A3").format = { font: { name: "Arial", size: 9, italic: true, color: "#6B5A63" } };
sheet.getRange("A5:B5").values = [["총 부스", booths.length]];
sheet.getRange("A5:B5").format = { fill: "#FDE1EF", font: { name: "Arial", size: 10, bold: true, color: "#6A2345" }, borders: { preset: "outside", style: "thin", color: "#E5A3C2" }, verticalAlignment: "center" };

sheet.getRange("A7:F7").values = [["번호", "구분", "부스명", "시간", "위치", "검수 메모"]];
sheet.getRange("A8:F59").values = booths;
const table = sheet.tables.add("A7:F59", true, "BoothList30");
table.style = "TableStyleMedium2";
table.showFilterButton = true;
table.showBandedRows = true;

sheet.getRange("A7:F7").format = {
  fill: "#B94E7F", font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center", verticalAlignment: "center",
  borders: { insideVertical: { style: "thin", color: "#F6D5E5" }, bottom: { style: "medium", color: "#8D315C" } },
};
sheet.getRange("A8:F59").format.font = { name: "Arial", size: 10, color: "#262126" };
sheet.getRange("A8:F59").format.verticalAlignment = "center";
sheet.getRange("A8:B59").format.horizontalAlignment = "center";
sheet.getRange("D8:D59").format.horizontalAlignment = "center";
sheet.getRange("C8:C59").format.wrapText = true;
sheet.getRange("F8:F59").format.wrapText = true;
sheet.getRange("F8:F59").format.font = { name: "Arial", size: 9, color: "#8A5200" };
sheet.getRange("A8:F59").conditionalFormats.addCustom('=$F8<>""', { fill: "#FFF4CE" });
sheet.getRange("A:A").format.columnWidth = 8;
sheet.getRange("B:B").format.columnWidth = 14;
sheet.getRange("C:C").format.columnWidth = 42;
sheet.getRange("D:D").format.columnWidth = 18;
sheet.getRange("E:E").format.columnWidth = 23;
sheet.getRange("F:F").format.columnWidth = 30;
sheet.getRange("A7:F7").format.rowHeight = 24;
sheet.getRange("A8:F59").format.rowHeight = 31;
sheet.freezePanes.freezeRows(7);

workbook.recalculate();
const inspect = await workbook.inspect({ kind: "table", sheetId: sheet.name, range: "A2:F59", include: "values,formulas", tableMaxRows: 60, tableMaxCols: 6, maxChars: 20000 });
console.log("INSPECT_START\n" + inspect.ndjson + "\nINSPECT_END");
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log("ERROR_SCAN_START\n" + errors.ndjson + "\nERROR_SCAN_END");

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({ sheetName: sheet.name, range: "A1:F25", scale: 1.25, format: "png" });
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`OUTPUT=${outputPath}`);
console.log(`PREVIEW=${previewPath}`);
