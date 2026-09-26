export default function BoothDetailHeading({
  category,
  subtitle,
  title,
  notice,
  logo,
  logoAlt = "",
}) {
  const headingClassName = subtitle
    ? "booth-detail-heading booth-detail-heading--compact"
    : "booth-detail-heading";

  return (
    <div className={headingClassName}>
      {category && <p className="booth-detail-heading__category">{category}</p>}
      {logo && (
        <img className="booth-detail-heading__logo" src={logo} alt={logoAlt} />
      )}
      {subtitle && <p className="booth-detail-heading__subtitle">{subtitle}</p>}
      {title && <h2 className="booth-detail-heading__title">{title}</h2>}
      {notice && <p className="booth-detail-heading__notice">{notice}</p>}
    </div>
  );
}
