import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  formatBoothSchedule,
  getBooth,
  getOperationForDay,
  hasBoothApi,
} from "./boothApi.js";

export default function useBoothDetail(expectedCategory) {
  const { day, boothId } = useParams();
  const id = Number(boothId);
  const isValidRoute =
    (day === "29" || day === "30") && Number.isInteger(id) && id > 0;
  const [requestResult, setRequestResult] = useState({
    boothId: "",
    data: null,
    status: "loading",
    message: "",
  });

  useEffect(() => {
    if (!hasBoothApi || !isValidRoute) {
      return undefined;
    }

    const controller = new AbortController();

    getBooth(id, controller.signal)
      .then((data) => {
        setRequestResult({
          boothId,
          data,
          status: data.category === expectedCategory ? "success" : "notFound",
          message: "",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setRequestResult({
            boothId,
            data: null,
            status:
              error.status === 404 || error.code === "BOOTH_NOT_FOUND"
                ? "notFound"
                : "error",
            message: error.message,
          });
        }
      });

    return () => controller.abort();
  }, [boothId, expectedCategory, id, isValidRoute]);

  const currentResult =
    requestResult.boothId === boothId ? requestResult : null;
  const status = !isValidRoute
    ? "notFound"
    : !hasBoothApi
      ? "unconfigured"
      : (currentResult?.status ?? "loading");
  const booth = status === "success" ? currentResult.data : null;
  const schedule = formatBoothSchedule(booth?.operations);
  const operation = getOperationForDay(booth?.operations, day);
  const message =
    status === "unconfigured"
      ? "부스 서버 연결을 준비 중입니다."
      : status === "loading"
        ? "부스 정보를 불러오는 중입니다."
        : status === "notFound"
          ? "해당 부스를 찾을 수 없습니다."
          : currentResult?.message || "부스 정보를 불러오지 못했습니다.";

  return { booth, day, message, operation, schedule };
}
