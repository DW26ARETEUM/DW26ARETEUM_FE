export default function BoothDetailPanel({ scrollable = false, children }) {
  const panelClassName = scrollable
    ? "booth-detail-panel booth-detail-panel--scrollable"
    : "booth-detail-panel";

  return (
    <div className={panelClassName}>
      <div className="booth-detail-panel__scroll">{children}</div>
    </div>
  );
}
