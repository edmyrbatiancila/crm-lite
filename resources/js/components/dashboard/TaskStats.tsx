import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ListTodo, Clock, CheckCircle2, Pause, X } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    pending: number;
    in_progress: number;
    completed: number;
    on_hold: number;
    cancelled: number;
  };
}

const taskChartConfig = {
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  in_progress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-3))",
  },
  on_hold: {
    label: "On Hold",
    color: "hsl(var(--chart-4))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function TaskStats({ stats }: TaskStatsProps) {
  const chartData = [
    { status: 'Pending', count: stats.pending, fill: 'var(--color-pending)' },
    { status: 'In Progress', count: stats.in_progress, fill: 'var(--color-in_progress)' },
    { status: 'Completed', count: stats.completed, fill: 'var(--color-completed)' },
    { status: 'On Hold', count: stats.on_hold, fill: 'var(--color-on_hold)' },
    { status: 'Cancelled', count: stats.cancelled, fill: 'var(--color-cancelled)' },
  ];

  const totalTasks = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const completionRate = totalTasks > 0 ? (stats.completed / totalTasks) * 100 : 0;

  const statusCards = [
    { 
      title: 'Pending', 
      value: stats.pending, 
      icon: ListTodo, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    { 
      title: 'In Progress', 
      value: stats.in_progress, 
      icon: Clock, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    { 
      title: 'Completed', 
      value: stats.completed, 
      icon: CheckCircle2, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    { 
      title: 'On Hold', 
      value: stats.on_hold, 
      icon: Pause, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500'
    },
    { 
      title: 'Cancelled', 
      value: stats.cancelled, 
      icon: X, 
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium">{card.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalTasks > 0 ? ((card.value / totalTasks) * 100).toFixed(1) : 0}% of total
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Task Status Overview</CardTitle>
            <CardDescription>
              Distribution of {totalTasks} tasks across different statuses - {completionRate.toFixed(1)}% completion rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={taskChartConfig}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="status"
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-pending)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
