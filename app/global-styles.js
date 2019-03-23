import { createGlobalStyle } from 'styled-components';
import dejavusans from 'resources/fonts/DejaVuSans.ttf';
import dejavusansBold from 'resources/fonts/DejaVuSans-Bold.ttf';
import dejavusansOblique from 'resources/fonts/DejaVuSans-Oblique.ttf';
import timesnewromanNormal from 'resources/fonts/times-new-roman_normal.ttf';
import timesnewromanBold from 'resources/fonts/times-new-roman_bold.ttf';
import timesnewromanItalic from 'resources/fonts/times-new-roman_italic.ttf';
import timesnewromanBoldItalic from 'resources/fonts/times-new-roman_bold-italic.ttf';
import arialNormal from 'resources/fonts/arial_normal.ttf';
import arialBold from 'resources/fonts/arial_bold.ttf';
import arialItalic from 'resources/fonts/arial_italic.ttf';
import arialBoldItalic from 'resources/fonts/arial_bold-italic.ttf';

const GlobalStyle = createGlobalStyle`

  /* Times New Roman */
  @font-face {
     font-family: 'Times New Roman';
     src: url(${timesnewromanNormal}) format('truetype');
     font-weight: normal;
     font-style: normal;
   }
  @font-face {
    font-family: 'Times New Roman';
    font-weight: bold;
    font-style: normal;
    src: url(${timesnewromanBold}) format('truetype');
  }
  @font-face {
    font-family: 'Times New Roman';
    font-weight: normal;
    font-style: italic;
    src: url(${timesnewromanItalic}) format('truetype');
  }
  @font-face {
    font-family: 'Times New Roman';
    font-weight: bold;
    font-style: italic;
    src: url(${timesnewromanBoldItalic}) format('truetype');
  }

  /* Arial */
  @font-face {
    font-family: 'Arial';
    src: url(${arialNormal}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Arial';
    font-weight: bold;
    font-style: normal;
    src: url(${arialBold}) format('truetype');
  }
  @font-face {
    font-family: 'Arial';
    font-weight: normal;
    font-style: italic;
    src: url(${arialItalic}) format('truetype');
  }
  @font-face {
    font-family: 'Arial';
    font-weight: bold;
    font-style: italic;
    src: url(${arialBoldItalic}) format('truetype');
  }

  /* DejaVu Sans */
  @font-face {
     font-family: 'DejaVu Sans';
     src: url(${dejavusans}) format('truetype');
     font-weight: normal;
     font-style: normal;
   }
  @font-face {
    font-family: 'DejaVu Sans';
    font-weight: bold;
    font-style: normal;
    src: url(${dejavusansBold}) format('truetype');
  }
  @font-face {
    font-family: 'DejaVu Sans';
    font-weight: normal;
    font-style: italic;
    src: url(${dejavusansOblique}) format('truetype');
  }
  @font-face {
    font-family: 'DejaVu Sans';
    font-weight: bold;
    font-style: italic;
    src: url(${dejavusansOblique}) format('truetype');
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  img {
    pointer-events: none;
  }
`;

export default GlobalStyle;
