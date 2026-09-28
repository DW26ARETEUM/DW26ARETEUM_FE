import { useEffect, useRef, useState } from "react";
import popupImage from "../../assets/images/boothDetail.png";
import flowerImage from "../../assets/images/somtalk/flower.png";
import defaultButton from "../../assets/images/defaultBtn.png";
import selectedButton from "../../assets/images/selectedBtn.png";
import { MAX_MESSAGE_LENGTH, SOMTALK_TABS } from "../../constants/somtalk.js";

// 글쓰기에서는 "전체" 제외
const CATEGORIES = SOMTALK_TABS.filter(({ value }) => value !== "all");

export default function SomTalkWriteModal({ onClose, onSubmit }) {
  const textareaRef = useRef(null);
  const [category, setCategory] = useState(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = Boolean(category && content.trim()) && !isSubmitting;

  // 열리면 바로 입력할 수 있게
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 한글 조합 중에 maxLength를 넘는 경우 대비해서 한 번 더 자르기
  const handleChange = (event) => {
    setContent(event.target.value.slice(0, MAX_MESSAGE_LENGTH));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      await onSubmit({ category, content: content.trim() });
    } catch (error) {
      // 서버가 보낸 이유(예: 메시지는 53자를 초과할 수 없습니다.)가 있으면 그대로 보여주기
      // TODO(기디): 실패 안내 문구/방식 확정되면 수정
      alert(error.message || "등록에 실패했어요. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="somtalk-write">
      <button
        type="button"
        className="somtalk-write__backdrop"
        onClick={onClose}
        aria-label="닫기"
      />

      <form
        className="somtalk-write__popup"
        style={{ backgroundImage: `url(${popupImage})` }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="somtalk-write-title"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="somtalk-write__close"
          onClick={onClose}
          aria-label="닫기"
        />

        <div className="somtalk-write__heading">
          <img src={flowerImage} alt="" />
          <h2 id="somtalk-write-title">솜톡 작성</h2>
          <img src={flowerImage} alt="" />
        </div>

        <p id="somtalk-write-category" className="somtalk-write__label">
          카테고리 선택
        </p>

        <div
          className="somtalk-write__categories"
          role="radiogroup"
          aria-labelledby="somtalk-write-category"
        >
          {CATEGORIES.map(({ value, label }) => {
            const isSelected = category === value;

            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`somtalk-tabs__tab${
                  isSelected ? " somtalk-tabs__tab--selected" : ""
                }`}
                style={{
                  backgroundImage: `url(${
                    isSelected ? selectedButton : defaultButton
                  })`,
                }}
                onClick={() => setCategory(value)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="somtalk-write__field">
          <textarea
            ref={textareaRef}
            className="somtalk-write__textarea"
            value={content}
            onChange={handleChange}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="남기고 싶은 말을 작성해주세요"
            aria-label="솜톡 내용"
          />
          <span className="somtalk-write__count">
            {content.length} / {MAX_MESSAGE_LENGTH}
          </span>
        </div>

        <button
          type="submit"
          className="somtalk-write__submit"
          disabled={!canSubmit}
        >
          작성 완료
        </button>
      </form>
    </div>
  );
}
