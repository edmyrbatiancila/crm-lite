
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { Rocket } from 'lucide-react';
import { projectChartConfig } from '@/hooks/dashboard/chartConfig';
import { gradientMap } from '@/hooks/dashboard/projects/utils';
import { ProjectChartStatus } from '@/types/projects/IProject';

interface ProjectStatsProps {
    stats: ProjectChartStatus;
}

export function ProjectStats({ stats }: ProjectStatsProps) {
    const chartData = [
        { name: 'Open', value: stats.open, fill: '#8B5CF6' },
        { name: 'In Progress', value: stats.in_progress, fill: '#F59E0B' },
        { name: 'Blocked', value: stats.blocked, fill: '#EF4444' },
        { name: 'Cancelled', value: stats.cancelled, fill: '#6B7280' },
        { name: 'Completed', value: stats.completed, fill: '#10B981' },
    ].filter(item => item.value > 0); // Only show statuses with data

    const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

    const projectStatusCards = [
        {
            title: "Total",
            value: stats.total,
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground'
        },
        {
            title: "Open",
            value: stats.open,
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground'
        },
        {
            title: "In Progress",
            value: stats.in_progress,
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground'
        },
        {
            title: "Blocked",
            value: stats.blocked,
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground'
        },
        {
            title: "Cancelled",
            value: stats.cancelled,
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground'
        },
        {
            title: "Completed",
            value: stats.completed,
            color: 'text-muted-foreground',
            bgColor: 'bg-muted',
            iconColor: 'text-muted-foreground'
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
            {projectStatusCards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-medium">{ card.title }</CardTitle>
                            {/* <Rocket className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
            </div>

            {/* Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-6">
                        <CardTitle className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-primary" />
                            Project Status Distribution
                        </CardTitle>
                        <CardDescription>
                            Overview of project statuses with <span className="font-semibold text-green-600">{completionRate.toFixed(1)}%</span> completion rate
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pie Chart */}
                            <div className="flex justify-center">
                                <ChartContainer config={ projectChartConfig } className="aspect-square max-h-[350px]">
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="openGradient" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                                            </linearGradient>
                                            <linearGradient id="inProgressGradient" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.6}/>
                                            </linearGradient>
                                            <linearGradient id="blockedGradient" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.6}/>
                                            </linearGradient>
                                            <linearGradient id="cancelledGradient" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#6B7280" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#6B7280" stopOpacity={0.6}/>
                                            </linearGradient>
                                            <linearGradient id="completedGradient" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#10B981" stopOpacity={0.6}/>
                                            </linearGradient>
                                        </defs>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={120}
                                            innerRadius={60}
                                            fill="#8884d8"
                                            stroke="white"
                                            strokeWidth={2}
                                            animationBegin={0}
                                            animationDuration={1000}
                                        >
                                        {chartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={gradientMap[entry.name] || entry.fill}
                                            />
                                        ))}
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </div>

                            {/* Legend and Summary */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Status Summary</h4>
                                <div className="space-y-3">
                                {chartData.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-4 h-4 rounded-full shadow-sm" 
                                                style={{ backgroundColor: item.fill }}
                                            />
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-lg">{item.value}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {stats.total > 0 ? ((item.value / stats.total) * 100).toFixed(1) : 0}%
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                </div>

                                {/* Additional Stats */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                                    <div className="text-sm text-muted-foreground">Project Health</div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {completionRate.toFixed(1)}% Complete
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {stats.completed} of {stats.total} projects finished
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
