'use client';

import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import type { TrafficDataPoint } from '../data/mock-data';

interface TrafficLineChartProps {
  data: TrafficDataPoint[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const chartConfig = {
  traffic: {
    label: 'Traffic',
    color: 'hsl(var(--primary))',
  },
};

export function TrafficLineChart({
  data,
  title = 'Total traffic',
  subtitle = 'Last 30 days:',
  className,
}: TrafficLineChartProps) {
  // Process data for chart
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      showLabel: index % 5 === 0,
    }));
  }, [data]);

  const hasData = data.some((d) => d.traffic > 0);

  return (
    <Card className={cn('border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]', className)}>
      <CardHeader className="flex-row items-center justify-between pb-2 pt-5 px-6">
        <CardTitle className="text-[15px] font-semibold">{title}</CardTitle>
        <button className="inline-flex items-center gap-0.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
          Detailed statistics
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="text-[13px] text-muted-foreground mb-4">{subtitle}</div>

        <div className="h-[180px] w-full">
          {hasData ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={true}
                    horizontal={true}
                    className="stroke-border"
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value, index) => (chartData[index]?.showLabel ? value : '')}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => value}
                        formatter={(value) => [`${value} GB`, 'Traffic']}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="traffic"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#trafficGradient)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-full flex flex-col">
              {/* Empty state - grid with vertical bars like LunaProxy */}
              <div className="flex-1 flex items-end gap-[2px] pb-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-t"
                    style={{ height: `${20 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
              {/* Axis line */}
              <div className="h-[1px] bg-border" />
              {/* No data message */}
              <div className="text-center pt-4">
                <p className="text-[13px] text-muted-foreground">No data to show</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
