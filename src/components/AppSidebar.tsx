import {
  Home,
  CalendarDays,
  ClipboardList,
  Users,
  Zap,
  BarChart3,
  Video,
  Plug,
  Globe,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Event Setup", url: "/event-setup", icon: CalendarDays },
  { title: "Registration", url: "/registration", icon: ClipboardList },
  { title: "People", url: "/people", icon: Users },
  { title: "Engagement", url: "/engagement", icon: Zap },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Recordings", url: "/recordings", icon: Video },
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Community", url: "/community", icon: Globe },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
            SpatialChat
          </span>
        )}
        {collapsed && (
          <span className="text-lg font-bold text-sidebar-foreground">S</span>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
