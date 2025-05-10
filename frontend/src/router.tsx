import { BrowserRouter, Routes, Route } from "react-router";
import { useAccount } from "wagmi";
import AppLayout from "./layouts/AppLayout";
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard";
import Loading from "./components/loading";

export default function Router() {
  const { isConnected, isConnecting } = useAccount();

  return (
    <BrowserRouter>
      {isConnecting && <Loading />}
      <Routes>
        <Route element={isConnected ? <AppLayout /> : <Landing />}>
          <Route path="/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
