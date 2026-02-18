export const eventStatusCounts = {
  draft: 3,
  scheduled: 5,
  live: 1,
  ended: 12,
};

export const keyMetrics = [
  { label: "Total Registrations", value: "2,847", change: "+12.5%", positive: true },
  { label: "Live Attendees", value: "342", change: "+8.3%", positive: true },
  { label: "Engagement Score", value: "78%", change: "+3.1%", positive: true },
  { label: "Sessions Today", value: "6", change: "-1", positive: false },
];

export const upcomingEvents = [
  { id: "1", name: "Product Launch 2026", date: "Feb 25, 2026", status: "scheduled" as const, attendees: 450 },
  { id: "2", name: "Team All-Hands Q1", date: "Mar 1, 2026", status: "scheduled" as const, attendees: 120 },
  { id: "3", name: "Developer Conference", date: "Mar 15, 2026", status: "draft" as const, attendees: 0 },
  { id: "4", name: "Customer Webinar Series", date: "Feb 20, 2026", status: "live" as const, attendees: 342 },
  { id: "5", name: "Partner Summit", date: "Apr 2, 2026", status: "draft" as const, attendees: 0 },
];

export const recentActivity = [
  { id: "1", text: "Sarah Chen registered for Product Launch 2026", time: "2 min ago", type: "registration" },
  { id: "2", text: "Poll results published for Customer Webinar", time: "15 min ago", type: "engagement" },
  { id: "3", text: "New room 'Networking Lounge' created", time: "1 hr ago", type: "setup" },
  { id: "4", text: "Recording available: Team Standup Feb 17", time: "2 hrs ago", type: "recording" },
  { id: "5", text: "HubSpot sync completed — 45 contacts updated", time: "3 hrs ago", type: "integration" },
  { id: "6", text: "Mark Johnson checked in to Customer Webinar", time: "4 hrs ago", type: "registration" },
];
