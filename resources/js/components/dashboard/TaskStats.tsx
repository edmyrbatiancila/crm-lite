import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid } from 'recharts';
import { ListTodo, Clock, CheckCircle2, Pause, X } from 'lucide-react';
import { TaskChartStatus } from '@/types/tasks/ITasks';
import { taskChartConfig } from '@/hooks/dashboard/chartConfig';

interface TaskStatsProps {
    stats: TaskChartStatus;
}

export function TaskStats({ stats }: TaskStatsProps) {
    const chartData = [
        { status: 'Pending', count: stats.pending, fill: '#3B82F6' }, // Blue
        { status: 'In Progress', count: stats.in_progress, fill: '#F59E0B' }, // Orange
        { status: 'Closed', count: stats.closed, fill: '#10B981' }, // Green
        { status: 'Waiting for Client', count: stats.waiting_client, fill: '#EAB308' }, // Yellow
        { status: 'Blocked', count: stats.blocked, fill: '#EF4444' }, // Red
        { status: 'Open', count: stats.open, fill: '#8B5CF6' }, // Purple
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
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500'
        },
        { 
            title: 'Closed', 
            value: stats.closed, 
            icon: CheckCircle2, 
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-500'
        },
        { 
            title: 'Waiting for Client', 
            value: stats.waiting_client, 
            icon: Pause, 
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-500'
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
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-500'
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
                                <CartesianGrid 
                                    vertical={ false }
                                    strokeDasharray="3 3" 
                                    stroke="currentColor" 
                                    className="opacity-20 dark:opacity-10"
                                />
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
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
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
