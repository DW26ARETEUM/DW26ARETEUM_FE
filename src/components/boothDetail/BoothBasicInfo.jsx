import dateIcon from "../../assets/images/booth/date.svg";
import timeIcon from "../../assets/images/booth/time.svg";
import locationIcon from "../../assets/images/booth/location.svg";
import personIcon from "../../assets/images/booth/person.svg";

export default function BoothBasicInfo({
  date,
  time,
  location,
  operator,
  locationImage,
  locationImageAlt = "부스 위치 안내",
}) {
  const operationItems = [
    { key: "date", icon: dateIcon, label: "날짜", value: date },
    { key: "time", icon: timeIcon, label: "운영 시간", value: time },
    { key: "location", icon: locationIcon, label: "위치", value: location },
    { key: "operator", icon: personIcon, label: "운영 주체", value: operator },
  ].filter(({ value }) => value);

  return (
    <div className="booth-basic-info">
      <h3 className="booth-basic-info__title">운영</h3>

      <dl className="booth-basic-info__card booth-basic-info__operation">
        {operationItems.map(({ key, icon, label, value }) => (
          <div key={key} className="booth-basic-info__row">
            <dt>
              <img src={icon} alt={label} />
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <h3 className="booth-basic-info__title booth-basic-info__title--location">
        위치 상세
      </h3>

      <div className="booth-basic-info__card booth-basic-info__location">
        {locationImage && <img src={locationImage} alt={locationImageAlt} />}
      </div>
    </div>
  );
}
