export default function BoothDetailPanel({ scrollable = false, children }) {
  if (scrollable) {
    return (
      <div className="booth-detail-panel booth-detail-panel--scrollable">
        <div className="booth-detail-panel__scroll">{children}</div>
      </div>
    );
  }

  return <div className="booth-detail-panel">{children}</div>;
}
