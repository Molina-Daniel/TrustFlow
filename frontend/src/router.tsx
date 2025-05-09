import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard";
export default function Router() {
  const isWalletConnected = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={isWalletConnected ? <AppLayout /> : <Landing />}>
          <Route path="/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
