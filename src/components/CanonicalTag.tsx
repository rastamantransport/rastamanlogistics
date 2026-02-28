import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://rastamanlogistics.lovable.app";

const CanonicalTag = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
    return () => {
      link?.remove();
    };
  }, [pathname]);

  return null;
};

export default CanonicalTag;
