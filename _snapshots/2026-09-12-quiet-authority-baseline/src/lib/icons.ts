import {
  Building2,
  CalendarClock,
  FileSignature,
  FileText,
  FolderOpen,
  GraduationCap,
  IdCard,
  Mail,
  Map,
  Phone,
  Store,
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
  Map,
  Phone,
  Store,
};

export function getServiceIcon(name: string): LucideIcon {
  return iconMap[name] ?? FolderOpen;
}
