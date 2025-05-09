import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Landing from "./views/Landing";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/*" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
