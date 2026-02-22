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
  LifeBuoy,
  FileText,
  Mail,
  Flag,
  ArrowUpRight,
  CreditCard,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

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
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

const supportLinks = [
  { label: "Developer Community", desc: "Technical discussions", icon: Users2, href: "#", external: true },
  { label: "Slack Community", desc: "General discussions", icon: MessageCircle, href: "#", external: true },
  { label: "Documentation", desc: null, icon: FileText, href: "#", external: true },
  { label: "Report service outage", desc: null, icon: Flag, href: "#", external: false },
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

              {/* Support with popover */}
              <SidebarMenuItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton tooltip="Support" className="hover:bg-sidebar-accent cursor-pointer">
                      <LifeBuoy className="h-4 w-4" />
                      <span>Support</span>
                      <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent side="right" align="start" className="w-72 p-0">
                    <div className="p-3 border-b border-border">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Get Help</p>
                    </div>
                    <div className="py-1">
                      {supportLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                        >
                          <link.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{link.label}</p>
                            {link.desc && <p className="text-xs text-muted-foreground">{link.desc}</p>}
                          </div>
                          {link.external && <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Included in Plan</p>
                        <Badge variant="outline" className="text-[10px] text-primary border-primary">SCALE</Badge>
                      </div>
                      <a href="mailto:support@spatialchat.com" className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">Email support</p>
                          <p className="text-xs text-muted-foreground">support@spatialchat.com</p>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
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
