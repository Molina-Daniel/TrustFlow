import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Hero from "./views/Hero";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/*" element={<Hero />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
