import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";
import { LayoutDashboard, ClipboardCheck, ScrollText, Users, Settings } from "lucide-react";

const items: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Approvals", to: "/admin/approvals", icon: ClipboardCheck },
  { label: "Audit logs", to: "/admin/audit", icon: ScrollText },
  { label: "Users", to: "/voter", icon: Users },
  { label: "Settings", to: "/admin", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: () => <DashboardShell items={items} title="Super Admin" />,
});
