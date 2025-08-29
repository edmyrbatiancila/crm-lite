import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid } from 'recharts';
import { ListTodo, Clock, CheckCircle2, Pause, X } from 'lucide-react';
import { TaskChartStatus } from '@/types/tasks/ITasks';

interface TaskStatsProps {
  stats: TaskChartStatus;
}

const taskChartConfig = {
  pending: {
    label: "Pending",
    color: "#3B82F6", // Blue
  },
  in_progress: {
    label: "In Progress", 
    color: "#F59E0B", // Amber
  },
  closed: {
    label: "Closed",
    color: "#10B981", // Green
  },
  blocked: {
    label: "Blocked",
    color: "#EF4444", // Red
  },
  waiting_client: {
    label: "Waiting for Client",
    color: "#8B5CF6", // Purple
  },
  open: {
    label: "Open",
    color: "#06B6D4", // Cyan
  },
} satisfies ChartConfig;

export function TaskStats({ stats }: TaskStatsProps) {
  const chartData = [
    { status: 'Pending', count: stats.pending, fill: '#3B82F6' },
    { status: 'In Progress', count: stats.in_progress, fill: '#F59E0B' },
    { status: 'Closed', count: stats.closed, fill: '#10B981' },
    { status: 'Waiting for Client', count: stats.waiting_client, fill: '#8B5CF6' },
    { status: 'Blocked', count: stats.blocked, fill: '#EF4444' },
    { status: 'Open', count: stats.open, fill: '#06B6D4' },
  ];

  const totalTasks = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const completionRate = totalTasks > 0 ? (stats.closed / totalTasks) * 100 : 0;

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
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500'
    },
    { 
      title: 'Closed', 
      value: stats.closed, 
      icon: CheckCircle2, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    },
    { 
      title: 'Waiting for Client', 
      value: stats.waiting_client, 
      icon: Pause, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    { 
      title: 'Blocked', 
      value: stats.blocked, 
      icon: X, 
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      title: 'Open',
      value: stats.open,
      icon: ListTodo,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
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
                <defs>
                  <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="inProgressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="closedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="waitingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="openGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.5} />
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
                  radius={4}
                  stroke="#fff"
                  strokeWidth={1}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.status === 'Pending' ? 'url(#pendingGradient)' :
                        entry.status === 'In Progress' ? 'url(#inProgressGradient)' :
                        entry.status === 'Closed' ? 'url(#closedGradient)' :
                        entry.status === 'Waiting for Client' ? 'url(#waitingGradient)' :
                        entry.status === 'Blocked' ? 'url(#blockedGradient)' :
                        'url(#openGradient)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
