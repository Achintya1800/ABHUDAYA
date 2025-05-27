// "use client";

// import { useEffect } from "react";

// export default function GoogleTranslate() {
//   useEffect(() => {
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,hi,gu,bn,ta,te,kn,ml,mr,pa,ur,or,as,ma,sd",
//           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },  
//         "google_translate_element"
//       );

//       setTimeout(() => {
//         // Hide Google Translate top bar
//         const style = document.createElement("style");
//         style.innerHTML = `
//        .VIpgJd-ZVi9od-ORHb-OEVmcd{
//         display: none;
//         }
//          .goog-te-gadget-simple{
//             height:1px;
//          }
//         .goog-te-gadget-icon{
//             opacity:0.0;
//         }
            
//         `;
//         document.head.appendChild(style);
//       }, 1000);
//     };

//     const script = document.createElement("script");
//     script.src =
//       "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-12 bg-gray-100 px-2 rounded-md">
//       {/* 🌍 Language Icon */}
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-5 h-5 text-gray-700"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
//         />
//       </svg>
//       <div id="google_translate_element" className="text-xs"></div>
//     </div>
//   );
// }
