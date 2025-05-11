import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col bg-[#030A06] text-white">
        <div className="relative min-h-screen w-full">
          {/* Blurred light effect */}
          <div className="absolute bottom-0 left-1/4 -translate-x-1/2 rounded-full w-[600px] h-[600px] bg-[#2243D466] blur-[100px] z-0 opacity-70"></div>

          {/* Hexagon background pattern - restricted to right half */}
          <div
            className="absolute inset-y-0 right-0 z-0 w-1/2 bg-cover bg-center bg-no-repeat opacity-20 size-full hidden md:block"
            style={{
              backgroundImage: "url('/hive-background.png')",
            }}
          />

          {/* Content layer that sits on top of background elements */}
          <div className="relative z-10 min-h-screen px-12 py-8">
            <div className="absolute top-0 left-0 md:hidden">
              <SidebarTrigger />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
