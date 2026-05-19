import { createFileRoute } from "@tanstack/react-router";
import { AuditLogsView } from "@/components/AuditLogsView";

export const Route = createFileRoute("/admin/audit")({ component: () => <AuditLogsView /> });
