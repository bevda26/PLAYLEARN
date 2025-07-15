
// src/components/dashboard/analytics-card.tsx
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
}

export const AnalyticsCard = ({ title, value, description, icon: Icon }: AnalyticsCardProps) => {
  return (
    <Card className="bg-card/60 backdrop-blur-md border-primary/20 hover:border-accent transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-parchment-white">{value}</div>
        {description && (
            <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
