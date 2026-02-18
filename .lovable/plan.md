

# SpatialChat Event Dashboard — Implementation Plan

## Overview
A centralized management platform for virtual event organizers to create, manage, and analyze events. We'll build a modern SaaS-style dashboard with a clean, data-rich UI.

---

## Phase 1: Foundation & Core Layout

### 1. App Shell & Navigation
- Sidebar navigation with collapsible sections: Home, Event Setup, Registration, People, Engagement, Analytics, Recordings, Integrations, Community
- Top header bar with user profile, notifications bell, and quick action buttons
- Responsive layout with mobile sidebar drawer

### 2. Home Dashboard
- Event status cards (Draft, Scheduled, Live, Ended) with counts
- Key metrics: Total Registrations, Live Attendees, Engagement Score, Sessions Today
- Quick action buttons: Create Room, Send Reminder, Launch Poll
- Upcoming events list with status badges
- Recent activity feed

---

## Phase 2: Event Setup

### 3. Event Creation & Configuration
- Multi-step event creation wizard (Details → Rooms → Agenda → Speakers → Review)
- Event details form: name, date/time, description, branding
- Room management: create/edit rooms (Lobby, Stage, Breakout, Networking, Help Desk) with custom backgrounds
- Session agenda builder with drag-and-drop time slots
- Speaker profile management with session assignment
- Room access & permissions controls
- Public agenda page preview

---

## Phase 3: Registration System

### 4. Registration Management
- Custom form builder with drag-and-drop fields
- Required/optional field toggles and conditional logic
- Ticket tier management (General, VIP, Sponsor, etc.)
- Branded registration page preview
- Registration analytics: conversion funnel, signups over time
- Invite link generator and calendar (.ics) download

---

## Phase 4: People Management

### 5. Attendee Directory
- Searchable attendee table with filters (role, ticket type, company, location)
- Tagging system for organizing attendees
- Status tracking (Registered, Invited, Checked-in, Active)
- Individual profile view with engagement activity timeline
- CSV import functionality
- CRM sync status indicators (HubSpot, Salesforce placeholders)

---

## Phase 5: Engagement Tools

### 6. Live Engagement Features
- Poll & survey creator with live results view
- Q&A management panel with upvoting and moderation
- Chat activity monitor with real-time metrics
- Per-session engagement tracking
- Engagement scoring dashboard per attendee
- Moderation tools panel

---

## Phase 6: Analytics & Recordings

### 7. Analytics Dashboard
- Registration funnel visualization
- Attendance metrics with charts (peak times, drop-off)
- Room occupancy heatmap
- Session participation breakdown
- Engagement metrics with scoring
- Export reports functionality

### 8. Recordings & Session Library
- Session recordings list with thumbnails
- Replay tracking (views, watch time)
- Filterable session library
- Download options

---

## Phase 7: Integrations & Community

### 9. Integrations Hub
- Integration cards for CRM (HubSpot, Salesforce), Email (Mailchimp, SendGrid), Analytics (GA, Mixpanel), Automation (Zapier, Make.com), Calendar
- Connection status and configuration UI
- Sync logs and status indicators

### 10. Community Management
- Persistent community rooms overview
- Member directory
- Recurring event scheduler
- Ongoing engagement tracking metrics

---

## Design Approach
- **Modern SaaS aesthetic**: Clean whites, subtle shadows, professional color palette
- **Data-rich but organized**: Cards, tables, and charts with clear hierarchy
- **Consistent UI patterns**: Using shadcn/ui components throughout
- **Responsive**: Full mobile and tablet support

## Technical Approach
- All UI built with React, TypeScript, Tailwind CSS, and shadcn/ui
- Mock data throughout for demonstration purposes
- React Router for multi-page navigation
- Recharts for analytics visualizations
- Backend (Supabase) can be connected later for real data persistence

