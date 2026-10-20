import React, { useEffect } from "react";
import { initAnalytics, getGaMeasurementId } from "../utils/analytics";

/** Loads GA4 (env `VITE_GA_MEASUREMENT_ID` or production fallback in analytics.ts). */
export const Analytics: React.FC = () => {
  useEffect(() => {
    if (getGaMeasurementId()) {
      initAnalytics();
    }
  }, []);

  return null;
};
