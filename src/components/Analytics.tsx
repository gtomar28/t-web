import React, { useEffect } from "react";
import { initAnalytics, getGaMeasurementId } from "../utils/analytics";

/** Loads GA4 (env `VITE_GA_MEASUREMENT_ID` or production fallback in analytics.ts). */
export const Analytics: React.FC = () => {
  useEffect(() => {
    const run = () => {
      if (getGaMeasurementId()) initAnalytics();
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 10000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(run, 5000);
    return () => window.clearTimeout(t);
  }, []);

  return null;
};
