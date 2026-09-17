import {
  Building2,
  CalendarClock,
  FileSignature,
  FileText,
  FolderOpen,
  GraduationCap,
  IdCard,
  Mail,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  IdCard,
  GraduationCap,
  FolderOpen,
  CalendarClock,
  Building2,
  FileSignature,
  FileText,
  Mail,
};

export function getServiceIcon(name: string): LucideIcon {
  return iconMap[name] ?? FolderOpen;
}
