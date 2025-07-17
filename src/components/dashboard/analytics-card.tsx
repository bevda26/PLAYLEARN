// src/components/dashboard/analytics-card.tsx
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  className?: string;
  valueClassName?: string;
  footer?: string;
  progressValue?: number;
  progressColor?: string;
}

export const AnalyticsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  className,
  valueClassName,
  footer,
  progressValue,
  progressColor,
}: AnalyticsCardProps) => {
  return (
    <Card className={cn("bg-card/60 backdrop-blur-md border-primary/20 hover:border-accent transition-colors duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className={cn("text-4xl font-bold", valueClassName)}>{value}</div>
        {description && (
            <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
        {progressValue !== undefined && (
          <Progress value={progressValue} className="w-full h-2 mt-2" indicatorClassName={progressColor} />
        )}
        {footer && (
          <p className="text-xs text-muted-foreground pt-1">{footer}</p>
        )}
      </CardContent>
    </Card>
  );
};
