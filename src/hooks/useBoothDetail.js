import { useEffect, useState } from "react";
import { getBooth, hasBoothApi } from "../api/boothApi.js";

export default function useBoothDetail(boothId, category) {
  const id = Number(boothId);
  const isValidId = Number.isInteger(id) && id > 0;

  const [result, setResult] = useState({
    boothId: null,
    booth: null,
    status: "loading",
  });

  useEffect(() => {
    if (!hasBoothApi || !isValidId) return;

    const controller = new AbortController();

    getBooth(id, controller.signal)
      .then((booth) => {
        if (controller.signal.aborted) return;

        const isValidBooth =
          booth && typeof booth === "object" && !Array.isArray(booth);

        setResult({
          boothId,
          booth: isValidBooth ? booth : null,
          status: !isValidBooth
            ? "error"
            : booth.category === category
              ? "success"
              : "notFound",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error.name === "AbortError") return;

        setResult({
          boothId,
          booth: null,
          status:
            error.status === 400 ||
            error.status === 404 ||
            error.code === "BOOTH_NOT_FOUND"
              ? "notFound"
              : "error",
        });
      });

    return () => controller.abort();
  }, [boothId, id, isValidId, category]);

  const currentResult = result.boothId === boothId ? result : null;

  const status = !isValidId
    ? "notFound"
    : !hasBoothApi
      ? "unconfigured"
      : (currentResult?.status ?? "loading");

  return {
    status,
    booth: status === "success" ? currentResult.booth : null,
  };
}
