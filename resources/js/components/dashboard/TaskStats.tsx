import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { ListTodo, Clock, CheckCircle2, Pause, X } from 'lucide-react';
import { TaskChartStatus } from '@/types/tasks/ITasks';
import { taskChartConfig } from '@/hooks/dashboard/chartConfig';

interface TaskStatsProps {
    stats: TaskChartStatus;
}

export function TaskStats({ stats }: TaskStatsProps) {
    const chartData = [
        { 
            status: 'Open', 
            count: stats.open || 0, 
            fill: '#3B82F6' // Blue
        },
        { 
            status: 'In Progress', 
            count: stats.in_progress || 0, 
            fill: '#F59E0B' // Amber
        },
        { 
            status: 'Pending', 
            count: stats.pending || 0, 
            fill: '#6366F1' // Indigo
        },
        { 
            status: 'Waiting Client', 
            count: stats.waiting_client || 0, 
            fill: '#8B5CF6' // Purple
        },
        { 
            status: 'Blocked', 
            count: stats.blocked || 0, 
            fill: '#EF4444' // Red
        },
        { 
            status: 'Closed', 
            count: stats.closed || 0, 
            fill: '#10B981' // Green
        },
    ];

    const totalTasks = Object.values(stats).reduce((sum, count) => sum + count, 0);
    const completionRate = totalTasks > 0 ? ((stats.closed || 0) / totalTasks) * 100 : 0;

    const statusCards = [
        { 
            title: 'Open', 
            value: stats.open || 0, 
            icon: ListTodo, 
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-500'
        },
        { 
            title: 'In Progress', 
            value: stats.in_progress || 0, 
            icon: Clock, 
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500'
        },
        { 
            title: 'Pending', 
            value: stats.pending || 0, 
            icon: Pause, 
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            iconColor: 'text-indigo-500'
        },
        { 
            title: 'Waiting Client', 
            value: stats.waiting_client || 0, 
            icon: Clock, 
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-500'
        },
        { 
            title: 'Blocked', 
            value: stats.blocked || 0, 
            icon: X, 
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            iconColor: 'text-red-500'
        },
        { 
            title: 'Closed', 
            value: stats.closed || 0, 
            icon: CheckCircle2, 
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-500'
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                        <ChartContainer 
                            config={taskChartConfig}
                            className='h-[300px] w-full'
                        >
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
                                    <linearGradient id="openGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                    </linearGradient>
                                    <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.3}/>
                                    </linearGradient>
                                    <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#6366F1" stopOpacity={0.3}/>
                                    </linearGradient>
                                    <linearGradient id="waitingGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                                    </linearGradient>
                                    <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#EF4444" stopOpacity={0.3}/>
                                    </linearGradient>
                                    <linearGradient id="closedGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.3}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid 
                                    vertical={false}
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
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth={1}
                                    maxBarSize={40}
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
