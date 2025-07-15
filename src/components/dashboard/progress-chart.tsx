
// src/components/dashboard/progress-chart.tsx
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { UserProgress } from '@/lib/types';

interface ProgressChartProps {
  completedQuests: UserProgress['questsCompleted'];
}

export const ProgressChart = ({ completedQuests }: ProgressChartProps) => {
  const data = useMemo(() => {
    const subjectCounts: { [key: string]: number } = {
      Math: 0,
      Science: 0,
      Language: 0,
      History: 0,
    };

    // We count unique quests, not total completions
    Object.keys(completedQuests).forEach((questId) => {
      if (questId.startsWith('math-')) subjectCounts.Math++;
      else if (questId.startsWith('science-')) subjectCounts.Science++;
      else if (questId.startsWith('language-')) subjectCounts.Language++;
      else if (questId.startsWith('history-')) subjectCounts.History++;
    });

    return [
      { name: 'Math', quests: subjectCounts.Math, fill: 'hsl(var(--chart-1))' },
      { name: 'Science', quests: subjectCounts.Science, fill: 'hsl(var(--chart-2))' },
      { name: 'Language', quests: subjectCounts.Language, fill: 'hsl(var(--chart-3))' },
      { name: 'History', quests: subjectCounts.History, fill: 'hsl(var(--chart-4))' },
    ];
  }, [completedQuests]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
        <XAxis 
            dataKey="name" 
            stroke="hsl(var(--foreground) / 0.8)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
        />
        <YAxis 
            stroke="hsl(var(--foreground) / 0.8)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
        />
        <Tooltip
            contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--card-foreground))',
            }}
            cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
        />
        <Bar dataKey="quests" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
