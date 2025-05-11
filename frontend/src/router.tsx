import { BrowserRouter, Routes, Route } from "react-router";
import { useAccount } from "wagmi";
import AppLayout from "./layouts/AppLayout";
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard";
import Loading from "./components/loading";
import FoundProjects from "./views/FoundProjects";

export default function Router() {
  const { isConnected, isConnecting } = useAccount();

  return (
    <BrowserRouter>
      {isConnecting && <Loading />}
      <Routes>
        <Route element={isConnected ? <AppLayout /> : <Landing />}>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/found-projects" element={<FoundProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
