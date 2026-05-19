export type ElectionStatus = "upcoming" | "active" | "completed";

export interface Candidate {
  id: string;
  name: string;
  party: string;
  bio: string;
  votes: number;
  photo: string; // initials
  color: string;
}

export interface Election {
  id: string;
  title: string;
  organization: string;
  description: string;
  status: ElectionStatus;
  startDate: string;
  endDate: string;
  voters: number;
  maxVoters: number;
  votesCast: number;
  candidates: Candidate[];
  category: string;
}

const palette = ["#5b8cff", "#a472ff", "#22d3ee", "#34d399", "#f59e0b", "#f472b6"];
const initials = (n: string) => n.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();

const mk = (name: string, party: string, votes: number, i: number): Candidate => ({
  id: `${name}-${i}`,
  name,
  party,
  bio: `${party} candidate with a focus on transparency, reform, and digital governance.`,
  votes,
  photo: initials(name),
  color: palette[i % palette.length],
});

export const elections: Election[] = [
  {
    id: "presidential-2026",
    title: "National Presidential Election 2026",
    organization: "Federal Election Commission",
    description:
      "Cast your vote securely for the next President. End-to-end encrypted, fully audited.",
    status: "active",
    startDate: "2026-05-10T08:00:00Z",
    endDate: "2026-05-20T20:00:00Z",
    voters: 18420,
    maxVoters: 25000,
    votesCast: 14210,
    category: "National",
    candidates: [
      mk("Aria Mehta", "Progressive Alliance", 5820, 0),
      mk("Daniyal Khan", "Unity Front", 4910, 1),
      mk("Sofia Lin", "Reform Party", 2410, 2),
      mk("Marcus Reyes", "Independent", 1070, 3),
    ],
  },
  {
    id: "university-senate",
    title: "University Senate Election",
    organization: "NUST Student Council",
    description: "Vote for the next student senate representatives.",
    status: "active",
    startDate: "2026-05-15T09:00:00Z",
    endDate: "2026-05-18T18:00:00Z",
    voters: 3120,
    maxVoters: 5000,
    votesCast: 2410,
    category: "Education",
    candidates: [
      mk("Hira Aslam", "Voice Coalition", 980, 0),
      mk("Bilal Tariq", "Future Forward", 870, 1),
      mk("Zara Iqbal", "Independent", 560, 2),
    ],
  },
  {
    id: "municipal-2026",
    title: "Metropolitan Mayoral Race",
    organization: "City of Lahore",
    description: "Choose your city's next mayor. Polls open soon.",
    status: "upcoming",
    startDate: "2026-06-01T08:00:00Z",
    endDate: "2026-06-05T20:00:00Z",
    voters: 0,
    maxVoters: 40000,
    votesCast: 0,
    category: "Municipal",
    candidates: [
      mk("Imran Sheikh", "Civic Action", 0, 0),
      mk("Nadia Qureshi", "Green Future", 0, 1),
      mk("Omar Faruq", "Heritage Party", 0, 2),
    ],
  },
  {
    id: "tech-board-2025",
    title: "Tech Workers Union Board",
    organization: "TWU International",
    description: "Annual board of directors election.",
    status: "completed",
    startDate: "2025-11-01T08:00:00Z",
    endDate: "2025-11-08T20:00:00Z",
    voters: 8420,
    maxVoters: 10000,
    votesCast: 8120,
    category: "Corporate",
    candidates: [
      mk("Lena Park", "Slate A", 3920, 0),
      mk("Yusuf Aziz", "Slate B", 2810, 1),
      mk("Rina Kapoor", "Independent", 1390, 2),
    ],
  },
  {
    id: "coop-board",
    title: "Cooperative Society Board",
    organization: "Skyline Co-op",
    description: "Elect three new board members.",
    status: "upcoming",
    startDate: "2026-06-12T09:00:00Z",
    endDate: "2026-06-14T18:00:00Z",
    voters: 0,
    maxVoters: 1200,
    votesCast: 0,
    category: "Community",
    candidates: [mk("A. Saeed", "Slate 1", 0, 0), mk("R. Malik", "Slate 2", 0, 1)],
  },
  {
    id: "guild-2025",
    title: "Designer Guild President",
    organization: "Global Designer Guild",
    description: "Completed annual presidential vote.",
    status: "completed",
    startDate: "2025-09-01T08:00:00Z",
    endDate: "2025-09-08T20:00:00Z",
    voters: 4210,
    maxVoters: 5000,
    votesCast: 4012,
    category: "Professional",
    candidates: [
      mk("Tara Nasir", "Studio United", 2210, 0),
      mk("Kabir Anand", "New Wave", 1802, 1),
    ],
  },
];

export const stats = {
  totalElections: 124,
  activeVoters: 84210,
  votesCast: 612430,
  integrity: 99.98,
};

export interface ApprovalRequest {
  id: string;
  creator: string;
  email: string;
  title: string;
  submitted: string;
  status: "pending" | "approved" | "rejected";
}

export const approvals: ApprovalRequest[] = [
  { id: "REQ-1042", creator: "Hira Aslam", email: "hira@nust.edu.pk", title: "Faculty Senate 2026", submitted: "2026-05-12", status: "pending" },
  { id: "REQ-1041", creator: "Marcus Reyes", email: "m.reyes@civic.org", title: "Ward 7 By-Election", submitted: "2026-05-11", status: "pending" },
  { id: "REQ-1040", creator: "Nadia Qureshi", email: "nadia@greens.pk", title: "Green Future Convention", submitted: "2026-05-10", status: "approved" },
  { id: "REQ-1039", creator: "Yusuf Aziz", email: "yusuf@twu.io", title: "Regional Chapter Vote", submitted: "2026-05-09", status: "rejected" },
  { id: "REQ-1038", creator: "Lena Park", email: "lena@twu.io", title: "Slate A Internal Primary", submitted: "2026-05-08", status: "approved" },
];

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
}

export const auditLogs: AuditLog[] = [
  { id: "LOG-9821", actor: "system", action: "Encryption key rotated", target: "vault://keys/primary", ip: "10.0.0.4", timestamp: "2026-05-16 09:12:04", severity: "info" },
  { id: "LOG-9820", actor: "admin@votevault", action: "Approved election", target: "REQ-1040", ip: "203.0.113.22", timestamp: "2026-05-16 08:55:11", severity: "info" },
  { id: "LOG-9819", actor: "voter:9f3a..", action: "Vote cast", target: "presidential-2026", ip: "198.51.100.7", timestamp: "2026-05-16 08:43:29", severity: "info" },
  { id: "LOG-9818", actor: "unknown", action: "Failed login (5x)", target: "auth/login", ip: "45.61.187.99", timestamp: "2026-05-16 08:20:02", severity: "warning" },
  { id: "LOG-9817", actor: "system", action: "Anomaly detected: vote rate spike", target: "presidential-2026", ip: "internal", timestamp: "2026-05-16 07:58:41", severity: "critical" },
  { id: "LOG-9816", actor: "creator@nust.edu.pk", action: "Created candidate", target: "Hira Aslam", ip: "111.68.99.10", timestamp: "2026-05-16 07:31:09", severity: "info" },
  { id: "LOG-9815", actor: "admin@votevault", action: "Rejected election", target: "REQ-1039", ip: "203.0.113.22", timestamp: "2026-05-15 22:14:54", severity: "warning" },
];

export const getElection = (id: string) => elections.find((e) => e.id === id);
