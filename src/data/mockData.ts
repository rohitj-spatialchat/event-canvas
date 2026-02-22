// ===== HOME PAGE DATA =====
export const homeMetrics = [
  { value: "24", label: "Total Events", change: "+12% this month", color: "hsl(235, 65%, 55%)" },
  { value: "3,842", label: "Total Attendees", change: "+24% this month", color: "hsl(152, 55%, 45%)" },
  { value: "1,234", label: "Engagements", change: "+18% this week", color: "hsl(0, 72%, 55%)" },
  { value: "$45.2K", label: "Revenue", change: "+8% this month", color: "hsl(38, 92%, 50%)" },
];

export const upcomingEvents = [
  { id: "1", name: "Product Launch Webinar", date: "20", month: "FEB", time: "10:00 AM", registered: 245, revenue: "$2,450", status: "SCHEDULED" },
  { id: "2", name: "Q1 Team All-Hands", date: "22", month: "FEB", time: "2:00 PM", registered: 156, revenue: "$0", status: "SCHEDULED" },
  { id: "3", name: "Customer Success Workshop", date: "25", month: "FEB", time: "11:00 AM", registered: 89, revenue: "$890", status: "SCHEDULED" },
];

export const recentActivity = [
  { id: "1", text: "23 new registrations for Product Launch Webinar", time: "5 minutes ago", icon: "registration" },
  { id: "2", text: "Q1 Team All-Hands event created", time: "1 hour ago", icon: "event" },
  { id: "3", text: "$1,250 revenue from Tech Summit 2024", time: "2 hours ago", icon: "revenue" },
  { id: "4", text: "High engagement in Virtual Workshop", time: "3 hours ago", icon: "engagement" },
];

// ===== EVENTS PAGE DATA =====
export const eventsData = [
  { id: "1", name: "Product Launch Webinar", type: "Webinar", date: "Feb 18, 2026", status: "live" as const, registrations: 312, capacity: 500, revenue: "$2,450" },
  { id: "2", name: "Q1 Team All-Hands", type: "Internal", date: "Feb 22, 2026", status: "scheduled" as const, registrations: 156, capacity: 200, revenue: "-" },
  { id: "3", name: "Customer Success Summit", type: "Conference", date: "Feb 25, 2026", status: "scheduled" as const, registrations: 412, capacity: 1000, revenue: "$8,900" },
  { id: "4", name: "Tech Talk Series: AI Trends", type: "Webinar", date: "Mar 1, 2026", status: "draft" as const, registrations: 0, capacity: 300, revenue: "-" },
  { id: "5", name: "Quarterly Business Review", type: "Internal", date: "Jan 15, 2026", status: "ended" as const, registrations: 45, capacity: 50, revenue: "-" },
  { id: "6", name: "Design System Workshop", type: "Workshop", date: "Mar 10, 2026", status: "scheduled" as const, registrations: 12, capacity: 50, revenue: "$1,200" },
  { id: "7", name: "Marketing Strategy 2026", type: "Meeting", date: "Mar 15, 2026", status: "draft" as const, registrations: 0, capacity: 100, revenue: "-" },
];

// ===== REGISTRATION PAGE DATA =====
export const registrationMetrics = [
  { value: "656", label: "Total Registrations", change: "+24% this week", positive: true },
  { value: "75%", label: "Avg Conversion Rate", change: "+5% vs last month", positive: true },
  { value: "4", label: "Active Forms", change: "No change", positive: null },
  { value: "7.2", label: "Avg Fields per Form", change: "Optimal", positive: null },
];

export const registrationForms = [
  { id: "1", name: "Product Launch Webinar", registered: 245, fields: 8, conversion: "68%", status: "ACTIVE", updated: "Updated 2 hours ago" },
  { id: "2", name: "Q1 Team All-Hands", registered: 189, fields: 6, conversion: "72%", status: "ACTIVE", updated: "Updated 1 day ago" },
  { id: "3", name: "Customer Success Summit", registered: 412, fields: 10, conversion: "81%", status: "ACTIVE", updated: "Updated 3 hours ago" },
  { id: "4", name: "Tech Talk Series", registered: 87, fields: 5, conversion: "65%", status: "ACTIVE", updated: "Updated 5 hours ago" },
];

export const recentRegistrations = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@company.com", event: "Product Launch Webinar", tier: "VIP", time: "5 minutes ago", color: "hsl(235, 65%, 55%)" },
  { initials: "MC", name: "Michael Chen", email: "m.chen@startup.io", event: "Customer Success Summit", tier: "GENERAL", time: "12 minutes ago", color: "hsl(152, 55%, 45%)" },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@tech.com", event: "Product Launch Webinar", tier: "SPONSOR", time: "18 minutes ago", color: "hsl(235, 65%, 55%)" },
  { initials: "DK", name: "David Kim", email: "david.kim@enterprise.com", event: "Q1 Team All-Hands", tier: "GENERAL", time: "25 minutes ago", color: "hsl(152, 55%, 45%)" },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@business.net", event: "Customer Success Summit", tier: "VIP", time: "32 minutes ago", color: "hsl(235, 65%, 55%)" },
];

// ===== PEOPLE PAGE DATA =====
export const peopleMetrics = [
  { value: "6", label: "Total Attendees" },
  { value: "3", label: "Checked In" },
  { value: "3", label: "VIP Attendees" },
  { value: "69%", label: "Avg Engagement" },
];

export const peopleData = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@company.com", company: "Tech Corp", role: "Product Manager", event: "Product Launch Webinar", status: "CHECKED IN", engagement: 92, tags: ["VIP", "Speaker"], color: "hsl(235, 65%, 55%)" },
  { initials: "MC", name: "Michael Chen", email: "m.chen@startup.io", company: "Startup Inc", role: "CEO", event: "Customer Success Summit", status: "REGISTERED", engagement: 78, tags: ["Sponsor"], color: "hsl(152, 55%, 45%)" },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@tech.com", company: "Innovation Labs", role: "Engineering Lead", event: "Product Launch Webinar", status: "CHECKED IN", engagement: 85, tags: ["VIP"], color: "hsl(235, 65%, 55%)" },
  { initials: "DK", name: "David Kim", email: "david.kim@enterprise.com", company: "Enterprise Solutions", role: "Director of Sales", event: "Q1 Team All-Hands", status: "REGISTERED", engagement: 65, tags: [], color: "hsl(38, 92%, 50%)" },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@business.net", company: "Business Dynamics", role: "Marketing Director", event: "Customer Success Summit", status: "CHECKED IN", engagement: 94, tags: ["VIP", "Sponsor"], color: "hsl(0, 72%, 55%)" },
];

// ===== ENGAGEMENT PAGE DATA =====
export const engagementMetrics = [
  { value: "2", label: "Active Polls", icon: "poll", color: "hsl(220, 15%, 90%)" },
  { value: "3", label: "Q&A Questions", icon: "qa", color: "hsl(152, 55%, 45%)" },
  { value: "3", label: "Chat Messages", icon: "chat", color: "hsl(0, 72%, 55%)" },
  { value: "78%", label: "Avg Engagement", icon: "star", color: "hsl(38, 92%, 50%)" },
];

export const pollsData = [
  {
    id: "1",
    question: "What feature would you like to see next?",
    responses: 156,
    event: "Product Launch Webinar",
    options: [
      { label: "AI Networking", votes: 62, percentage: 40 },
      { label: "Mobile App", votes: 54, percentage: 35 },
      { label: "Advanced Analytics", votes: 40, percentage: 25 },
    ],
  },
  {
    id: "2",
    question: "How would you rate this session?",
    responses: 89,
    event: "Q1 Team All-Hands",
    options: [
      { label: "Excellent", votes: 52, percentage: 58 },
      { label: "Good", votes: 28, percentage: 31 },
      { label: "Average", votes: 9, percentage: 10 },
    ],
  },
];

export const qaData = [
  { id: "1", question: "How does the new pricing model work?", askedBy: "Sarah Johnson", time: "5 min ago", event: "Product Launch Webinar", votes: 24, status: "answered" as const, answer: "Great question! The new pricing is based on active users per month..." },
  { id: "2", question: "Will there be API documentation available?", askedBy: "Michael Chen", time: "8 min ago", event: "Product Launch Webinar", votes: 18, status: "pending" as const },
  { id: "3", question: "What are the system requirements?", askedBy: "Emily Rodriguez", time: "15 min ago", event: "Customer Success Summit", votes: 12, status: "answered" as const, answer: "The platform works on all modern browsers..." },
];

// ===== ANALYTICS PAGE DATA =====
export const analyticsMetrics = [
  { label: "Total Views", value: "12,458", change: "+15.3%", positive: true },
  { label: "Avg Session Duration", value: "42m", change: "+8.7%", positive: true },
  { label: "Engagement Rate", value: "78%", change: "+12.1%", positive: true },
  { label: "Conversion Rate", value: "24%", change: "-3.2%", positive: false },
];

export const eventPerformance = [
  { event: "Product Launch Webinar", registrations: 245, attendance: 198, attendanceRate: 81, engagement: 92, satisfaction: 4.8 },
  { event: "Q1 Team All-Hands", registrations: 189, attendance: 165, attendanceRate: 87, engagement: 85, satisfaction: 4.6 },
  { event: "Customer Success Summit", registrations: 412, attendance: 356, attendanceRate: 86, engagement: 88, satisfaction: 4.9 },
  { event: "Tech Talk Series", registrations: 87, attendance: 72, attendanceRate: 83, engagement: 76, satisfaction: 4.4 },
];

export const trafficSources = [
  { source: "Direct", visitors: 4250, percentage: 42 },
  { source: "Email Campaign", visitors: 3180, percentage: 31 },
  { source: "Social Media", visitors: 1720, percentage: 17 },
  { source: "Referral", visitors: 1020, percentage: 10 },
];

export const topPages = [
  { page: "Event Landing Page", views: 5420, avgTime: "3m 24s", bounceRate: "32%" },
  { page: "Registration Form", views: 3890, avgTime: "2m 15s", bounceRate: "18%" },
  { page: "Speaker Profiles", views: 2340, avgTime: "1m 45s", bounceRate: "45%" },
  { page: "Agenda Page", views: 1980, avgTime: "2m 50s", bounceRate: "28%" },
];

// ===== REVENUE PAGE DATA =====
export const revenueMetrics = [
  { value: "$45,250", color: "hsl(152, 55%, 45%)" },
  { value: "$1,884", color: "hsl(235, 65%, 55%)" },
  { value: "3842", color: "hsl(38, 92%, 50%)" },
  { value: "$1,250", color: "hsl(0, 72%, 55%)" },
];

export const revenueByType = [
  { type: "Webinar", amount: "$28,500", percentage: 63, color: "hsl(235, 65%, 55%)" },
  { type: "Workshop", amount: "$12,200", percentage: 27, color: "hsl(152, 55%, 45%)" },
  { type: "Conference", amount: "$4,550", percentage: 10, color: "hsl(38, 92%, 50%)" },
];

export const revenueEvents = [
  { name: "Product Launch Webinar", date: "Feb 20, 2026", tickets: 245, revenue: "$2,450", status: "SCHEDULED" },
  { name: "Tech Summit 2024", date: "Feb 15, 2026", tickets: 89, revenue: "$1,250", status: "COMPLETED" },
  { name: "Customer Success Workshop", date: "Feb 25, 2026", tickets: 89, revenue: "$890", status: "SCHEDULED" },
  { name: "Q1 Team All-Hands", date: "Feb 22, 2026", tickets: 156, revenue: "Free", status: "SCHEDULED" },
];

export const monthlyRevenue = [
  { month: "Jan", amount: 38200 },
  { month: "Feb", amount: 45300 },
  { month: "Mar", amount: 42100 },
  { month: "Apr", amount: 51300 },
];

// ===== RECORDINGS PAGE DATA =====
export const recordingsMetrics = [
  { value: "4", label: "Total Recordings" },
  { value: "1,222", label: "Total Views" },
  { value: "3", label: "Ready to Watch" },
  { value: "1833.6 GB", label: "Total Storage" },
];

export const recordingsData = [
  { id: "1", title: "Product Launch Webinar - Main Session", event: "Product Launch Webinar", date: "Feb 17", views: 342, size: "1.2 GB", duration: "1h 45m", status: "ready" as const },
  { id: "2", title: "Q1 Team All-Hands - Keynote", event: "Q1 Team All-Hands", date: "Feb 15", views: 189, size: "850 MB", duration: "52m", status: "ready" as const },
  { id: "3", title: "Customer Success Summit - Day 1", event: "Customer Success Summit", date: "Feb 14", views: 567, size: "2.4 GB", duration: "3h 20m", status: "ready" as const },
  { id: "4", title: "Tech Talk - AI Integration Workshop", event: "Tech Talk Series", date: "Feb 12", views: 124, size: "980 MB", duration: "1h 15m", status: "processing" as const },
];

export const recentViews = [
  { initials: "SJ", name: "Sarah Johnson", recording: "Product Launch Webinar - Main Session", watched: "45m watched", time: "2 hours ago", progress: 85, color: "hsl(235, 65%, 55%)" },
  { initials: "MC", name: "Michael Chen", recording: "Customer Success Summit - Day 1", watched: "2h 15m watched", time: "5 hours ago", progress: 67, color: "hsl(152, 55%, 45%)" },
  { initials: "ER", name: "Emily Rodriguez", recording: "Q1 Team All-Hands - Keynote", watched: "52m watched", time: "1 day ago", progress: 100, color: "hsl(235, 65%, 55%)" },
  { initials: "DK", name: "David Kim", recording: "Product Launch Webinar - Main Session", watched: "1h 20m watched", time: "1 day ago", progress: 76, color: "hsl(235, 65%, 55%)" },
];

// ===== SETTINGS PAGE DATA =====
export const settingsTabs = ["Team", "Single sign-on (SSO)", "SCIM provisioning", "Two-step authentication", "Security history", "Installed apps", "Access requests", "MCP access"];

export const teamMembers = [
  { initials: "TG", name: "Tina Geizen", email: "tina@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 hours ago", color: "hsl(235, 65%, 55%)" },
  { initials: "SV", name: "Shanmukha V", email: "shanmukha.v@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "6 hours ago", color: "hsl(152, 55%, 45%)" },
  { initials: "RK", name: "Riddhik Kochhar", email: "riddhik.k@spatial.chat", role: "Super Administrator", auth: "Two-step", lastLogin: "4 days ago", badge: "You", color: "hsl(38, 92%, 50%)" },
  { initials: "OD", name: "Oleg Danylenko", email: "oleg@teemyco.com", role: "Super Administrator", extra: "+ 1 others", auth: "Two-step", lastLogin: "4 days ago", badge: "Owner", color: "hsl(0, 72%, 55%)" },
  { initials: "AB", name: "Andre Borrelly", email: "ab@spatial.chat", role: "Super Administrator", extra: "+ 1 others", auth: "Two-step", lastLogin: "2 weeks ago", color: "hsl(235, 65%, 55%)" },
  { initials: "JP", name: "James Park", email: "james.p@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 weeks ago", color: "hsl(152, 55%, 45%)" },
  { initials: "SK", name: "Saurav Kumar", email: "saurav.k@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 weeks ago", color: "hsl(235, 65%, 55%)" },
  { initials: "AD", name: "Anastasia Davis", email: "anastasia@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "4 weeks ago", color: "hsl(38, 92%, 50%)" },
];
