import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";
import { LayoutDashboard, Vote, Users, KeyRound, BarChart3, Plus } from "lucide-react";

const items: NavItem[] = [
  { label: "Overview", to: "/creator", icon: LayoutDashboard, exact: true },
  { label: "My elections", to: "/creator/elections", icon: Vote },
  { label: "Create new", to: "/creator/elections/new", icon: Plus },
  { label: "Candidates", to: "/creator/candidates", icon: Users },
  { label: "Secret IDs", to: "/creator/secret-ids", icon: KeyRound },
  { label: "Results", to: "/creator/results", icon: BarChart3 },
];

export const Route = createFileRoute("/creator")({
  component: () => <DashboardShell items={items} title="Creator Console" />,
});
