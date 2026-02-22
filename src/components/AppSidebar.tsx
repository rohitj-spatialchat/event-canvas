import {
  Home,
  CalendarDays,
  ClipboardList,
  Users,
  MessageCircle,
  BarChart3,
  DollarSign,
  Video,
  Users2,
  Globe,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { SpatialChatLogo } from "@/components/SpatialChatLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Events", url: "/events", icon: CalendarDays },
  { title: "Registration", url: "/registration", icon: ClipboardList },
  { title: "People", url: "/people", icon: Users },
  { title: "Engagement", url: "/engagement", icon: MessageCircle },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Revenue", url: "/revenue", icon: DollarSign },
  { title: "Recordings", url: "/recordings", icon: Video },
  { title: "Networking", url: "/networking", icon: Users2 },
  { title: "Community", url: "/community", icon: Globe },
  { title: "AI Assistant", url: "/ai-assistant", icon: Bot },
  { title: "Integrations", url: "/integrations", icon: Plug, soon: true },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <div className="flex h-14 items-center justify-center px-4">
        <SpatialChatLogo showText={!collapsed} />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.soon && (
                        <span className="ml-auto text-[10px] font-semibold text-warning">SOON</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom collapse/expand toggle */}
      <div className="mt-auto p-2">
        <button
          onClick={toggleSidebar}
          className="flex h-9 w-full items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </Sidebar>
  );
}
