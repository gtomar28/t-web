import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyRouteSeo } from "../utils/applyRouteSeo";
import { trackPageView } from "../utils/analytics";

export const SEOManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    applyRouteSeo(pathname);
    trackPageView(pathname);
  }, [pathname]);

  return null;
};
