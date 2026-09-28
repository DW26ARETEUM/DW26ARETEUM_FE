const LONG_TITLE_LENGTH = 20;

export default function BoothDetailHeading({
  category,
  subtitle,
  title,
  notice,
  logo,
  logoAlt = "",
}) {
  const headingClassName = [
    "booth-detail-heading",
    subtitle && "booth-detail-heading--compact",
    title?.length > LONG_TITLE_LENGTH && "booth-detail-heading--long-title",
  ]
    .filter(Boolean)
    .join(" ");

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
