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
  WalletIcon,
} from "lucide-react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
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
import { formatEther } from "viem";

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
    url: "/found-projects",
  },
  {
    title: "Vote Proposal",
    icon: GavelIcon,
    url: "/vote-proposal",
  },
  {
    title: "Make Proposal",
    icon: SquarePenIcon,
    url: "/make-proposal",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    url: "/settings",
  },
];

const bottomNavItems = [
  {
    title: "Security",
    icon: ShieldIcon,
    url: "/security",
  },
  {
    title: "Help Centre",
    icon: HelpCircleIcon,
    url: "/help-centre",
  },
];

export function AppSidebar({
  className,
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  // For native WND token balance
  const { data: wndBalance } = useBalance({
    address,
  });

  // For TF governance token
  const { data: tfBalance } = useBalance({
    address,
    token: "0xA36a9239A7D70B38DDe5cbAA5394dFd46f33cb4e", // GovToken address
  });

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

        <SidebarSeparator className="my-4 mx-2 bg-[#4B4B99]" />

        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center gap-2 mb-2">
            <WalletIcon className="h-5 w-5" />
            <p className="text-white text-md text-center">Your Balance</p>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-10 px-4 justify-center text-gray-300 hover:text-white hover:bg-[#2a3a5a]"
            >
              <div>
                <img
                  src="/src/assets/polkadot-symbol.png"
                  alt="WND"
                  className="h-6 w-auto"
                />
                <span className="text-white text-md -ml-2">
                  WND:{" "}
                  {wndBalance
                    ? parseFloat(formatEther(wndBalance.value)).toFixed(4)
                    : "0.0000"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-10 px-4 justify-center text-gray-300 hover:text-white hover:bg-[#2a3a5a]"
            >
              <div>
                <img src="/logo.svg" alt="WND" className="h-6 w-auto" />
                <span>
                  TF:{" "}
                  {tfBalance
                    ? parseFloat(formatEther(tfBalance.value)).toFixed(4)
                    : "0.0000"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-4">
        <div className="flex justify-center">Wallet Address</div>
        <div className="flex justify-center">{shortAddress}</div>
      </SidebarFooter>
    </Sidebar>
  );
}
