"use client";
import { useEffect } from "react";

const Hatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const widgetDiv = document.createElement("div");
    widgetDiv.innerHTML = `
      <elevenlabs-convai agent-id="NQ5f1ZbkTJKWwLol7Oas"></elevenlabs-convai>
      <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
    `;
    document.body.appendChild(widgetDiv);

    const style = document.createElement("style");
    style.innerHTML = `
      ._canvas_me40k_114, ._poweredBy_me40k_322, ._avatar_me40k_76, 
      ._compact_me40k_70 ._poweredBy_me40k_322, 
      ._full_me40k_347 ._poweredBy_me40k_322, 
      ._wrapper_me40k_16 ._compact_me40k_70 ._open_me40k_55 ._hasLanguageSelect_me40k_127 {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }
      ._wrapper_me40k_16 {
        gap: 2px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(widgetDiv);
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default Hatbot;
