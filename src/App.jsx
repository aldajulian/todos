import { useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import ChangeLog from "./changelog";
import Landing from "./Landing";
import Onboarding from "./components/Onboarding";
import { setting_atoms } from "./utils/store";
import { useAtom } from "jotai";

export function App() {
  const [setting] = useAtom(setting_atoms);
  return (
    <div className="wrapper">
      <Routes>
        {/* {
          setting.name ?
          <Route path="/" element={<Todos />} />
          :
          <Route path="/" element={<Landing />} />
        } */}
        <Route path="/" element={<Todos />} />
        <Route path="/changelog" element={<ChangeLog />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </div>
  );
}

export default App;
