import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export default function SectionHeader({
  title,
  icon: Icon,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="size-6 text-primary/80" />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <p className="text-muted-foreground text-lg">{description}</p>
    </div>
  );
}
