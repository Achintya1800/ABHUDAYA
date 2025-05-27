"use client";

import { useEffect, useRef } from "react";

export default function GoogleTranslate() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return; // Prevent multiple instances
    isInitialized.current = true;

    window.googleTranslateElementInit = () => {
      // Remove any existing translation widget
      const existingElement = document.getElementById("google_translate_element");
      if (existingElement) existingElement.innerHTML = "";

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,gu,bn,ta,te,kn,ml,mr,pa,ur,or,as,ma,sd",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      setTimeout(() => {
        // Hide Google Translate top bar and refine UI
        const style = document.createElement("style");
        style.innerHTML = `
          .VIpgJd-ZVi9od-ORHb-OEVmcd {
            display: none;
          }
          .goog-te-gadget-simple {
            display: flex;
            align-items: center;
            gap: 8px;
            background: transparent !important;
            padding: 0;
            border: none;
            font-size: 14px;
            color: inherit; /* Matches header text color */
            cursor: pointer;
            box-shadow: none;
          }
          .VIpgJd-ZVi9od-xl07Ob-lTBxed {
            display: flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            color: inherit;
          }
          .goog-te-gadget-icon {
            display: none;
          }
          .goog-te-gadget-simple a {
            display: flex;
            align-items: center;
          }
        `;
        document.head.appendChild(style);
      }, 1000);
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div id="google_translate_element" className="text-sm font-medium text-gray-700 cursor-pointer"></div>
    </div>
  );
}