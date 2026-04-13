
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import App from "./app/App.tsx";
  import MagicPinCaseStudy from "./app/pages/MagicPinCaseStudy.tsx";
  import MagicFleetCaseStudy from "./app/pages/MagicFleetCaseStudy.tsx";
  import AIGameDesignCaseStudy from "./app/pages/AIGameDesignCaseStudy.tsx";
  import { ThemeProvider } from "./app/context/ThemeContext.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/work/magicpin" element={<MagicPinCaseStudy />} />
          <Route path="/work/magicfleet" element={<MagicFleetCaseStudy />} />
          <Route path="/work/ai-game-design" element={<AIGameDesignCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
  