// 픽셀 알약 버튼 레이어 (viewBox 88x36 기준, 가로 폭에 맞춰 늘어남)
const HIGHLIGHT = [
  [12.17, 2.51, 63.66, 2.51],
  [12.17, 30.98, 63.66, 2.51],
  [7.49, 28.46, 6.55, 2.51],
  [5.62, 25.11, 2.81, 4.19],
  [7.49, 5.02, 6.55, 2.51],
  [5.62, 6.7, 2.81, 4.19],
  [2.81, 10.88, 3.75, 14.23],
  [73.96, 28.46, 6.55, 2.51],
  [79.58, 25.11, 2.81, 4.19],
  [73.96, 5.02, 6.55, 2.51],
  [79.58, 6.7, 2.81, 4.19],
  [81.45, 10.88, 3.75, 14.23],
];

const BORDER = [
  [12.17, 0, 63.66, 2.51],
  [12.17, 33.49, 63.66, 2.51],
  [75.83, 2.51, 4.68, 2.51],
  [75.83, 30.98, 4.68, 2.51],
  [82.38, 6.7, 2.81, 4.19],
  [82.38, 25.12, 2.81, 4.19],
  [85.19, 10.88, 2.81, 14.23],
  [80.51, 5.02, 1.87, 1.67],
  [80.51, 29.3, 1.87, 1.67],
  [7.49, 2.51, 4.68, 2.51],
  [7.49, 30.98, 4.68, 2.51],
  [2.81, 6.7, 2.81, 4.19],
  [2.81, 25.12, 2.81, 4.19],
  [0, 10.88, 2.81, 14.23],
  [5.62, 5.02, 1.87, 1.67],
  [5.62, 29.3, 1.87, 1.67],
];

const FILL = [
  [6.55, 10.88, 1.87, 14.23],
  [8.42, 7.53, 71.15, 20.93],
  [14.04, 5.02, 59.92, 2.51],
  [14.04, 28.46, 59.92, 2.51],
  [79.57, 10.88, 1.87, 14.23],
];

function Rects({ rects, fill }) {
  return rects.map(([x, y, width, height]) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
    />
  ));
}

export default function FilterButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      className={`booth-map-filter${selected ? " booth-map-filter--selected" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <svg
        className="booth-map-filter__shape"
        viewBox="0 0 88 36"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <Rects rects={HIGHLIGHT} fill="#fde1ef" />
        <Rects rects={BORDER} fill="#fb1d78" />
        <Rects rects={FILL} fill={selected ? "#ff6ea9" : "#fdc5e1"} />
      </svg>
      <span className="booth-map-filter__label">{label}</span>
    </button>
  );
}
