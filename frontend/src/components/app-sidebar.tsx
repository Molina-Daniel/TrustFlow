import type React from "react";
import { Link, useLocation } from "react-router";
import {
  GavelIcon,
  HandHeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LayersIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldIcon,
  SquarePenIcon,
} from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    url: "/",
  },
  {
    title: "Categories",
    icon: LayersIcon,
    url: "/categories",
  },
  {
    title: "Fund Projects",
    icon: HandHeartIcon,
    url: "#",
  },
  {
    title: "Vote Proposal",
    icon: GavelIcon,
    url: "#",
  },
  {
    title: "Make Proposal",
    icon: SquarePenIcon,
    url: "#",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    url: "#",
  },
];

const bottomNavItems = [
  {
    title: "Security",
    icon: ShieldIcon,
    url: "#",
  },
  {
    title: "Help Centre",
    icon: HelpCircleIcon,
    url: "#",
  },
];

export function AppSidebar({
  className,
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortAddress = address?.slice(0, 6) + "..." + address?.slice(-4);

  return (
    <Sidebar className={cn("border-r-0 text-white pt-5", className)}>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-10 px-4 justify-start text-gray-300 hover:text-white hover:bg-[#2a3a5a]",
                    isActive && "bg-[#2a3a5a] text-white"
                  )}
                >
                  <Link to={item.url}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarSeparator className="my-4 mx-2 bg-[#4B4B99]" />

        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="h-10 px-4 justify-start text-gray-300 hover:text-white hover:bg-[#2a3a5a]"
              >
                <a href={item.url}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-10 px-4 justify-start text-gray-300 hover:text-white hover:bg-[#2a3a5a]"
              onClick={() => disconnect()}
            >
              <a href="#">
                <LogOutIcon className="h-5 w-5" />
                <span>Disconnect</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <div className="flex justify-center">{shortAddress}</div>
      </SidebarFooter>
    </Sidebar>
  );
}
