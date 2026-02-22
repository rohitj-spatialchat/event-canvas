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
  { value: "12,847", label: "Total Contacts" },
  { value: "3,842", label: "Event Attendees" },
  { value: "1,204", label: "Checked In" },
  { value: "486", label: "VIP Contacts" },
  { value: "69%", label: "Avg Engagement" },
  { value: "8", label: "Industries" },
];

export const peopleData = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@company.com", company: "Tech Corp", role: "Product Manager", location: "San Francisco, CA", industry: "Technology", event: "Product Launch Webinar", status: "CHECKED IN", engagement: 92, tags: ["VIP", "Speaker"], color: "hsl(235, 65%, 55%)", crmSource: "hubspot", crmStage: "Customer", crmDealValue: "$48,000", crmLastSync: "2 min ago", crmLeadScore: 95 },
  { initials: "MC", name: "Michael Chen", email: "m.chen@startup.io", company: "Startup Inc", role: "CEO", location: "New York, NY", industry: "SaaS", event: "Customer Success Summit", status: "REGISTERED", engagement: 78, tags: ["Sponsor"], color: "hsl(152, 55%, 45%)", crmSource: "salesforce", crmStage: "Opportunity", crmDealValue: "$125,000", crmLastSync: "5 min ago", crmLeadScore: 82 },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@tech.com", company: "Innovation Labs", role: "Engineering Lead", location: "Austin, TX", industry: "Technology", event: "Product Launch Webinar", status: "CHECKED IN", engagement: 85, tags: ["VIP"], color: "hsl(235, 65%, 55%)", crmSource: "hubspot", crmStage: "MQL", crmDealValue: "$15,000", crmLastSync: "10 min ago", crmLeadScore: 71 },
  { initials: "DK", name: "David Kim", email: "david.kim@enterprise.com", company: "Enterprise Solutions", role: "Director of Sales", location: "Chicago, IL", industry: "Enterprise Software", event: "Q1 Team All-Hands", status: "REGISTERED", engagement: 65, tags: [], color: "hsl(38, 92%, 50%)", crmSource: "salesforce", crmStage: "SQL", crmDealValue: "$75,000", crmLastSync: "1 hr ago", crmLeadScore: 64 },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@business.net", company: "Business Dynamics", role: "Marketing Director", location: "London, UK", industry: "Consulting", event: "Customer Success Summit", status: "CHECKED IN", engagement: 94, tags: ["VIP", "Sponsor"], color: "hsl(0, 72%, 55%)", crmSource: "hubspot", crmStage: "Customer", crmDealValue: "$92,000", crmLastSync: "3 min ago", crmLeadScore: 98 },
  { initials: "JW", name: "James Wilson", email: "j.wilson@finserv.com", company: "FinServ Global", role: "VP of Operations", location: "Boston, MA", industry: "Financial Services", event: "Q1 Team All-Hands", status: "REGISTERED", engagement: 58, tags: [], color: "hsl(270, 55%, 55%)", crmSource: "salesforce", crmStage: "MQL", crmDealValue: "$35,000", crmLastSync: "20 min ago", crmLeadScore: 56 },
  { initials: "AP", name: "Aisha Patel", email: "a.patel@healthio.com", company: "HealthIO", role: "Chief Data Officer", location: "Toronto, CA", industry: "Healthcare", event: "Customer Success Summit", status: "CHECKED IN", engagement: 88, tags: ["VIP"], color: "hsl(195, 65%, 45%)", crmSource: "hubspot", crmStage: "Opportunity", crmDealValue: "$68,000", crmLastSync: "8 min ago", crmLeadScore: 79 },
  { initials: "TM", name: "Thomas Martinez", email: "t.martinez@retailx.com", company: "RetailX", role: "Head of Digital", location: "Miami, FL", industry: "Retail", event: "Product Launch Webinar", status: "REGISTERED", engagement: 72, tags: ["Sponsor"], color: "hsl(38, 92%, 50%)", crmSource: "salesforce", crmStage: "SQL", crmDealValue: "$55,000", crmLastSync: "15 min ago", crmLeadScore: 68 },
];

export const crmJourneyData: Record<string, { date: string; action: string; source: string; detail: string; type: "event" | "crm" | "email" | "deal" | "meeting" | "score" }[]> = {
  "Sarah Johnson": [
    { date: "Feb 22, 2026", action: "Checked into event", source: "SpatialChat", detail: "Product Launch Webinar", type: "event" },
    { date: "Feb 22, 2026", action: "Contact synced to HubSpot", source: "HubSpot", detail: "Auto-synced after check-in", type: "crm" },
    { date: "Feb 21, 2026", action: "Opened email campaign", source: "HubSpot", detail: "Product Launch Invite - 3x opens", type: "email" },
    { date: "Feb 20, 2026", action: "Registered for event", source: "SpatialChat", detail: "Product Launch Webinar - VIP ticket", type: "event" },
    { date: "Feb 18, 2026", action: "Deal updated", source: "HubSpot", detail: "Deal value increased to $48,000", type: "deal" },
    { date: "Feb 15, 2026", action: "Meeting scheduled", source: "HubSpot", detail: "Demo call with Sales team", type: "meeting" },
    { date: "Feb 10, 2026", action: "Lead score updated", source: "HubSpot", detail: "Score: 72 → 95 (VIP event attendance)", type: "score" },
    { date: "Feb 5, 2026", action: "Form submission", source: "HubSpot", detail: "Downloaded Product Whitepaper", type: "crm" },
    { date: "Jan 28, 2026", action: "First website visit", source: "HubSpot", detail: "Organic search - pricing page", type: "crm" },
  ],
  "Michael Chen": [
    { date: "Feb 22, 2026", action: "Contact synced to Salesforce", source: "Salesforce", detail: "Auto-synced on registration", type: "crm" },
    { date: "Feb 21, 2026", action: "Registered for event", source: "SpatialChat", detail: "Customer Success Summit - Sponsor", type: "event" },
    { date: "Feb 19, 2026", action: "Opportunity created", source: "Salesforce", detail: "Enterprise Plan - $125,000", type: "deal" },
    { date: "Feb 16, 2026", action: "Email sequence started", source: "Salesforce", detail: "Enterprise nurture sequence", type: "email" },
    { date: "Feb 12, 2026", action: "Discovery call completed", source: "Salesforce", detail: "30 min call with AE team", type: "meeting" },
    { date: "Feb 8, 2026", action: "Lead score updated", source: "Salesforce", detail: "Score: 55 → 82 (sponsor interest)", type: "score" },
    { date: "Feb 1, 2026", action: "Inbound lead captured", source: "Salesforce", detail: "Contact form - enterprise inquiry", type: "crm" },
  ],
  "Emily Rodriguez": [
    { date: "Feb 22, 2026", action: "Checked into event", source: "SpatialChat", detail: "Product Launch Webinar", type: "event" },
    { date: "Feb 20, 2026", action: "Registered for event", source: "SpatialChat", detail: "Product Launch Webinar - VIP", type: "event" },
    { date: "Feb 18, 2026", action: "Contact synced to HubSpot", source: "HubSpot", detail: "MQL qualification triggered", type: "crm" },
    { date: "Feb 15, 2026", action: "Clicked email CTA", source: "HubSpot", detail: "Webinar invite - clicked 'Register Now'", type: "email" },
    { date: "Feb 10, 2026", action: "Lead score updated", source: "HubSpot", detail: "Score: 45 → 71 (multiple content downloads)", type: "score" },
  ],
  "David Kim": [
    { date: "Feb 22, 2026", action: "Registered for event", source: "SpatialChat", detail: "Q1 Team All-Hands", type: "event" },
    { date: "Feb 20, 2026", action: "SQL qualification", source: "Salesforce", detail: "Qualified by SDR team", type: "crm" },
    { date: "Feb 17, 2026", action: "Opportunity created", source: "Salesforce", detail: "Platform license - $75,000", type: "deal" },
    { date: "Feb 14, 2026", action: "Demo completed", source: "Salesforce", detail: "45 min product demo", type: "meeting" },
    { date: "Feb 10, 2026", action: "Email replied", source: "Salesforce", detail: "Replied to outbound sequence", type: "email" },
  ],
  "Lisa Anderson": [
    { date: "Feb 22, 2026", action: "Checked into event", source: "SpatialChat", detail: "Customer Success Summit", type: "event" },
    { date: "Feb 22, 2026", action: "Deal stage updated", source: "HubSpot", detail: "Moved to 'Customer' - $92,000 closed", type: "deal" },
    { date: "Feb 21, 2026", action: "Contract signed", source: "HubSpot", detail: "Annual enterprise agreement", type: "deal" },
    { date: "Feb 19, 2026", action: "Registered for event", source: "SpatialChat", detail: "Customer Success Summit - VIP + Sponsor", type: "event" },
    { date: "Feb 15, 2026", action: "Proposal sent", source: "HubSpot", detail: "Custom enterprise proposal", type: "crm" },
    { date: "Feb 10, 2026", action: "Meeting completed", source: "HubSpot", detail: "Executive alignment call", type: "meeting" },
    { date: "Feb 5, 2026", action: "Lead score maxed", source: "HubSpot", detail: "Score: 88 → 98 (contract negotiation)", type: "score" },
    { date: "Jan 20, 2026", action: "First event attended", source: "SpatialChat", detail: "Tech Innovation Summit 2026", type: "event" },
  ],
  "James Wilson": [
    { date: "Feb 22, 2026", action: "Registered for event", source: "SpatialChat", detail: "Q1 Team All-Hands", type: "event" },
    { date: "Feb 19, 2026", action: "MQL qualification", source: "Salesforce", detail: "Marketing qualified lead", type: "crm" },
    { date: "Feb 15, 2026", action: "Email opened", source: "Salesforce", detail: "Enterprise webinar invite", type: "email" },
    { date: "Feb 10, 2026", action: "Lead score updated", source: "Salesforce", detail: "Score: 32 → 56", type: "score" },
  ],
  "Aisha Patel": [
    { date: "Feb 22, 2026", action: "Checked into event", source: "SpatialChat", detail: "Customer Success Summit", type: "event" },
    { date: "Feb 21, 2026", action: "Opportunity created", source: "HubSpot", detail: "Healthcare Plan - $68,000", type: "deal" },
    { date: "Feb 18, 2026", action: "Demo completed", source: "HubSpot", detail: "Product walkthrough - 45 min", type: "meeting" },
    { date: "Feb 14, 2026", action: "Registered for event", source: "SpatialChat", detail: "Customer Success Summit - VIP", type: "event" },
    { date: "Feb 10, 2026", action: "Lead score updated", source: "HubSpot", detail: "Score: 52 → 79", type: "score" },
    { date: "Feb 5, 2026", action: "Inbound inquiry", source: "HubSpot", detail: "Healthcare compliance features", type: "crm" },
  ],
  "Thomas Martinez": [
    { date: "Feb 22, 2026", action: "Registered for event", source: "SpatialChat", detail: "Product Launch Webinar - Sponsor", type: "event" },
    { date: "Feb 20, 2026", action: "SQL qualification", source: "Salesforce", detail: "Qualified by SDR", type: "crm" },
    { date: "Feb 17, 2026", action: "Opportunity created", source: "Salesforce", detail: "Retail Platform - $55,000", type: "deal" },
    { date: "Feb 12, 2026", action: "Meeting completed", source: "Salesforce", detail: "Discovery call - retail needs", type: "meeting" },
    { date: "Feb 8, 2026", action: "Email replied", source: "Salesforce", detail: "Interested in sponsor package", type: "email" },
  ],
};

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
