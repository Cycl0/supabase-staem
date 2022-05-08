import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  <React.StrictMode>
  <MantineProvider
    theme={{
      fontFamily: "Noto Sans, sans-serif",
      headings: {
        fontFamily: "Noto Sans, sans-serif",
      },
      colorScheme: "dark",
      colors: {
        primary: [
          "#42484F",
          "#3B4249",
          "#343B44",
          "#2D3640",
          "#27313C",
          "#214B6B",
          "#1B2837",
          "#1B242F",
          "#1A2128",
          "#191E23",
          "#171B1F",
          "#1A3A53",
          "rgba(23, 32, 45, 0.7)",
        ],
        dark: [
          "#FFFFFF",
          "#4A6D88",
          "#3E607A",
          "rgba(255,255,255,0.5)",
          "#294A64",
          "#1A3A53",
          "#21425B",
          "#193245",
          "#182A39",
          "#16242F",
          "#141F28",
          "#121B21",
          "#10171C",
        ],
      },
    }}
  >
    <App />
  </MantineProvider>
  //</React.StrictMode>
);
