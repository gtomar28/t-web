/** Home Kiduart scrubber + campus graph hotspots (same order). */
export type KiduartTeaserModule = {
  title: string;
  desc: string;
  bullets: string[];
  graph: { x: number; y: number };
};

export const KIDUART_TEASER_JOURNEY: KiduartTeaserModule[] = [
  {
    title: "Admissions",
    desc: "The year starts with an enquiry. Enquiries, applications, interviews and registration run as one pipeline until a student record exists.",
    bullets: [
      "Enquiry capture with source and follow-up owner",
      "Application review with documents attached",
      "Interview scheduling with evaluation on file",
      "Registration that opens the student profile",
    ],
    graph: { x: 50, y: 21 },
  },
  {
    title: "Student records",
    desc: "Admission papers, guardians, class history and documents sit on one profile the whole campus reads — from desk to classroom.",
    bullets: [
      "Single record from admission through alumni",
      "Guardians and emergency contacts linked",
      "Session-wise class and section history",
      "Documents stored against the student",
    ],
    graph: { x: 50, y: 46 },
  },
  {
    title: "Attendance",
    desc: "Teachers mark on their own screen. Parents get same-day visibility; coordinators see patterns without chasing registers.",
    bullets: [
      "Fast daily marking by class teacher",
      "Same-day alerts to parents where enabled",
      "Leave and absence reasons on record",
      "Reports ready for coordinators and leadership",
    ],
    graph: { x: 38, y: 32 },
  },
  {
    title: "Fees & finance",
    desc: "Fee heads, concessions, instalments, counter and online payments, receipts and outstanding dues on one ledger.",
    bullets: [
      "Structure by class, category or student",
      "Online and counter collection with receipts",
      "Live outstanding and concession tracking",
      "Finance views aligned to the academic year",
    ],
    graph: { x: 71, y: 70 },
  },
  {
    title: "Parents",
    desc: "Circulars, fee reminders and attendance notices go from one place to the right class or parent group — with a delivery trail.",
    bullets: [
      "Targeted by class, section or custom group",
      "Templates for fees, events and alerts",
      "Delivery record instead of blind broadcast",
      "Parents see what matters to their child",
    ],
    graph: { x: 29, y: 70 },
  },
  {
    title: "Exams",
    desc: "Schedules, marks entry, grading and report cards stay on one academic trail instead of scattered sheets.",
    bullets: [
      "Exam calendars tied to classes",
      "Marks and grade rules in one place",
      "Report cards generated from live data",
      "History preserved session to session",
    ],
    graph: { x: 24, y: 42 },
  },
  {
    title: "Transport",
    desc: "Routes, vehicles and drivers stay organised so transport is part of the school record — not a separate spreadsheet.",
    bullets: [
      "Routes, stops and vehicle assignment",
      "Driver and helper records on file",
      "Student–route mapping from the profile",
      "Tracking hooks where your fleet supports it",
    ],
    graph: { x: 76, y: 68 },
  },
  {
    title: "Sports",
    desc: "Grounds, teams and activity blocks connect to the same calendar and student profiles your academic office already uses.",
    bullets: [
      "Sports facilities and slots on the campus map",
      "Teams and participation tied to students",
      "Events and meets on the school calendar",
      "Coaches see rosters from live records",
    ],
    graph: { x: 82, y: 36 },
  },
  {
    title: "Library",
    desc: "Catalog, issue and return, and fines stay tied to student records instead of a disconnected register.",
    bullets: [
      "Catalog and copy tracking",
      "Issue/return from the student profile",
      "Fine rules with clear history",
      "Reading lists by class where you need them",
    ],
    graph: { x: 18, y: 40 },
  },
];
