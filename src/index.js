import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Noto Sans, sans-serif",
        headings: {
          fontFamily: "Noto Sans, sans-serif",
        },
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
            "#16181B",
            "#141618",
          ],
        },
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
