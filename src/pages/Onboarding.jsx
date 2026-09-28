import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Onboarding.css";
import chatFrame from "../assets/images/onboarding/chat.png";
import fireworksLeft from "../assets/images/onboarding/firework1.png";
import fireworksRight from "../assets/images/onboarding/firework2.png";
import arcade from "../assets/images/onboarding/game.png";
import pinkButton from "../assets/images/onboarding/pinkBtn.png";
import transformedSom from "../assets/images/onboarding/som.png";
import defaultSom from "../assets/images/onboarding/somDefault.png";
import sideWalkRight from "../assets/images/onboarding/somWalkDirection-1.png";
import sideWalkLeft from "../assets/images/onboarding/somWalkDirection-3.png";
import backSom from "../assets/images/onboarding/somWalk-4.png";
import frontSom from "../assets/images/onboarding/somWalk-1.png";
import title from "../assets/images/onboarding/title.png";
import transformationStar from "../assets/images/onboarding/transformationStar.png";
import whiteButton from "../assets/images/onboarding/whtieBtn.png";

const story = [
  {
    text: "앗...! 야생의 솜솜이 (이)가 나타났다!",
    character: defaultSom,
    effect: false,
  },
  {
    text: "…… 오잉!? 솜솜이의 상태가 …… !!",
    character: defaultSom,
    effect: true,
  },
  {
    text: "솜솜이 (이)가\n[ 축제솜 ] (으)로 진화했다 … !!",
    character: transformedSom,
    effect: false,
  },
  {
    text: "[다음으로] 버튼을 눌러 축제솜을\n우리의 축제로 데려가주세요!!",
    character: transformedSom,
    effect: false,
  },
];
const transformationDuration = 2400;
const transformationSparkles = [
  "sparkle-left-upper",
  "sparkle-right-upper",
  "sparkle-left-lower",
  "sparkle-right-lower",
];

function Character({ src, x, y, direction, effect = false }) {
  const image =
    direction === "up"
      ? backSom
      : direction === "down"
        ? frontSom
        : direction === "left"
          ? sideWalkLeft
          : sideWalkRight;

  return (
    <div
      className={`onboarding-character${effect ? " is-transforming" : ""}${src ? "" : " is-walking"}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {effect && (
        <div className="onboarding-transformation-sparkles" aria-hidden="true">
          {transformationSparkles.map((sparkle) => (
            <img
              key={sparkle}
              className={`onboarding-transform-star ${sparkle}`}
              src={transformationStar}
              alt=""
            />
          ))}
        </div>
      )}
      <img
        className="onboarding-som"
        src={src ?? image}
        alt="축제 솜솜이"
        draggable="false"
      />
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [storyStep, setStoryStep] = useState(null);
  const [motion, setMotion] = useState({
    x: 50,
    y: 83,
    direction: "right",
    pathIndex: 0,
  });

  useEffect(() => {
    if (storyStep === 1 || storyStep === 2) {
      const timeout = window.setTimeout(
        () => setStoryStep(storyStep + 1),
        transformationDuration,
      );
      return () => window.clearTimeout(timeout);
    }

    if (storyStep !== null) return undefined;

    const path = [
      { x: 75, y: 83, direction: "right" },
      { x: 75, y: 72, direction: "up" },
      { x: 50, y: 72, direction: "left" },
      { x: 50, y: 83, direction: "down" },
      { x: 25, y: 83, direction: "left" },
      { x: 25, y: 94, direction: "down" },
      { x: 50, y: 94, direction: "right" },
      { x: 50, y: 83, direction: "up" },
    ];

    const timer = window.setInterval(() => {
      setMotion((current) => {
        const step = 0.7;
        const target = path[current.pathIndex];
        let x = current.x;
        let y = current.y;

        if (target.direction === "right") x = Math.min(target.x, x + step);
        if (target.direction === "left") x = Math.max(target.x, x - step);
        if (target.direction === "down") y = Math.min(target.y, y + step);
        if (target.direction === "up") y = Math.max(target.y, y - step);

        const reachedTarget =
          (target.direction === "right" && x >= target.x) ||
          (target.direction === "left" && x <= target.x) ||
          (target.direction === "down" && y >= target.y) ||
          (target.direction === "up" && y <= target.y);

        const pathIndex = reachedTarget
          ? (current.pathIndex + 1) % path.length
          : current.pathIndex;

        return {
          x,
          y,
          pathIndex,
          direction: path[pathIndex].direction,
        };
      });
    }, 50);

    return () => window.clearInterval(timer);
  }, [storyStep]);

  const activeStory = storyStep === null ? null : story[storyStep];

  function handleComplete() {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/", { replace: true });
  }

  function advanceStory() {
    if (storyStep === story.length - 1) {
      handleComplete();
      return;
    }
    setStoryStep((step) => (step === null ? 0 : step + 1));
  }

  return (
    <main className="onboarding" aria-label="Som Thing in the Night 시작 화면">
      <div className="onboarding-sky" aria-hidden="true">
        <img
          className="onboarding-fireworks fireworks-left"
          src={fireworksLeft}
          alt=""
        />
        <img
          className="onboarding-fireworks fireworks-right"
          src={fireworksRight}
          alt=""
        />
        <p className="onboarding-tagline">Girls, are you ready to enjoy</p>
        <img
          className="onboarding-title"
          src={title}
          alt="Som Thing in the Night"
        />
      </div>

      <div className="onboarding-arcade" aria-hidden="true">
        <img className="onboarding-arcade-image" src={arcade} alt="" />
        <div className="onboarding-game-window">
          {activeStory ? (
            <Character
              src={activeStory.character}
              x={50}
              y={86}
              direction="down"
              effect={activeStory.effect}
            />
          ) : (
            <Character x={motion.x} y={motion.y} direction={motion.direction} />
          )}
        </div>
      </div>

      {activeStory ? (
        <section
          className={`onboarding-dialog${storyStep === 2 ? " onboarding-dialog--evolution" : ""}${storyStep === story.length - 1 ? " onboarding-dialog--final" : ""}`}
          aria-live="polite"
        >
          <img className="onboarding-dialog-frame" src={chatFrame} alt="" />
          <p className="onboarding-dialog-text">{activeStory.text}</p>
          {!activeStory.effect && storyStep !== 2 && (
            <button
              className="onboarding-next"
              type="button"
              onClick={advanceStory}
            >
              다음으로 <span aria-hidden="true">▶</span>
            </button>
          )}
        </section>
      ) : (
        <nav className="onboarding-actions" aria-label="시작 방법 선택">
          <button type="button" onClick={() => setStoryStep(0)}>
            <img src={whiteButton} alt="" />
            <span>스토리 보고 시작하기</span>
          </button>
          <button type="button" onClick={handleComplete}>
            <img src={pinkButton} alt="" />
            <span>바로 시작하기</span>
          </button>
        </nav>
      )}
    </main>
  );
}
