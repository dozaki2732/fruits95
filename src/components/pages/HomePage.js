import React from "react";
import HomePageContents from "../ui/HomePageContents";
import "../../style/style.css";

// const GlobalStyles = createGlobalStyle`
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('${ms_sans_serif}') format('woff2');
//     font-weight: 400;
//     font-style: normal
//   }
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('${ms_sans_serif_bold}') format('woff2');
//     font-weight: bold;
//     font-style: normal
//   }
//   body {
//     font-family: 'ms_sans_serif';
//   }
//   ${styleReset}
// `;

export default function HomePage() {
  return (
    <div className="home-page-bg">
      <HomePageContents />
    </div>
  );
}
