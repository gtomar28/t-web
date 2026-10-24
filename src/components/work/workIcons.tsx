import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  GraduationCap,
  Layers,
  LayoutList,
  Megaphone,
  Monitor,
  Search,
  Settings,
  Users,
  Video,
} from "lucide-react";
import type { WorkIconKey } from "../../data/workPages";

const MAP: Record<WorkIconKey, LucideIcon> = {
  search: Search,
  layers: Layers,
  circleCheck: CheckCircle2,
  monitor: Monitor,
  fileText: FileText,
  list: LayoutList,
  settings: Settings,
  code: Code2,
  users: Users,
  bot: Bot,
  database: Database,
  megaphone: Megaphone,
  video: Video,
  school: GraduationCap,
};

export function workIcon(key: WorkIconKey): LucideIcon {
  return MAP[key];
}
