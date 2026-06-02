import {
  Globe2,
  BookOpen,
  Leaf,
  Users,
  Scale,
  Lightbulb,
  Heart,
  Briefcase,
  GraduationCap,
  Shield,
} from "lucide-react";
import type { ProgramIcon, ProgramColor, StoryGradient, StatusDotColor } from "@/types";

export const iconMap = {
  globe: Globe2,
  book: BookOpen,
  leaf: Leaf,
  users: Users,
  scale: Scale,
  lightbulb: Lightbulb,
  heart: Heart,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  shield: Shield,
} as const satisfies Record<ProgramIcon, unknown>;

export const colorBgMap: Record<ProgramColor, string> = {
  brand: "bg-brand-900",
  emerald: "bg-emerald-800",
  green: "bg-green-800",
  teal: "bg-teal-700",
  amber: "bg-amber-600",
  rose: "bg-rose-700",
  slate: "bg-slate-700",
};

export const storyGradientMap: Record<StoryGradient, string> = {
  brand: "from-brand-900 to-brand-700",
  "slate-brand": "from-slate-900 to-brand-900",
  emerald: "from-emerald-900 to-emerald-700",
  teal: "from-teal-900 to-teal-700",
  amber: "from-amber-900 to-amber-700",
};

export const statusDotMap: Record<StatusDotColor, string> = {
  amber: "bg-amber-400 text-amber-400",
  emerald: "bg-emerald-400 text-emerald-400",
  rose: "bg-rose-400 text-rose-400",
  teal: "bg-teal-400 text-teal-400",
  slate: "bg-slate-400 text-slate-400",
};
