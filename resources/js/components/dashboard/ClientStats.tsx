import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, UserPlus, TrendingUp } from 'lucide-react';
import { ClientChartMonthlyData, ClientChartStatus } from '@/types/clients/IClients';

interface ClientStatsProps {
    stats: ClientChartStatus;
    monthlyData: ClientChartMonthlyData[];
}

const clientChartConfig = {
    clients: {
        label: "New Clients",
        color: "#3B82F6", // Bright blue
    },
} satisfies ChartConfig;

export function ClientStats({ stats, monthlyData }: ClientStatsProps) {
    const growthRate = stats.previousMonth > 0 
    ? ((stats.newThisMonth - stats.previousMonth) / stats.previousMonth) * 100 
    : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">
                            All registered clients
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.newThisMonth}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.previousMonth} last month
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            vs last month
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>

            {/* Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Client Acquisition Trend</CardTitle>
                        <CardDescription>
                            New clients acquired over the last 6 months
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={clientChartConfig}>
                            <BarChart
                                data={monthlyData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <defs>
                                    <linearGradient 
                                        id="clientGradient" 
                                        x1="0" 
                                        y1="0" 
                                        x2="0" 
                                        y2="1"
                                    >
                                        <stop 
                                            offset="0%" 
                                            stopColor="#3B82F6" 
                                            stopOpacity={0.8}
                                        />
                                        <stop 
                                            offset="100%" 
                                            stopColor="#3B82F6" 
                                            stopOpacity={0.2}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid 
                                    vertical={false}
                                    strokeDasharray="3 3" 
                                    stroke="currentColor" 
                                    className="opacity-20 dark:opacity-10"
                                />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    className="text-xs"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    className="text-xs"
                                />
                                <ChartTooltip
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="clients"
                                    fill="url(#clientGradient)"
                                    radius={6}
                                    stroke="#3B82F6"
                                    strokeWidth={1}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
