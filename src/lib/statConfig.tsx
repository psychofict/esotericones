import { Users, Globe, Headphones, Disc3 } from "lucide-react";
import type { TranslationKeys } from "@/i18n/types";

export const statKeys: Record<string, keyof TranslationKeys> = {
  "Artists": "stats.artists",
  "Total Streams": "stats.totalStreams",
  "Countries": "stats.countries",
  "Releases": "stats.releases",
};

export const statIcons: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  headphones: <Headphones className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  disc: <Disc3 className="w-5 h-5" />,
};
