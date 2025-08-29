import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface OverviewTrendsProps {
    monthlyData: Array<{
        month: string;
        fullMonth: string;
        clients: number;
        projects: number;
        tasks: number;
        users: number;
    }>;
}

const trendsChartConfig = {
    clients: {
        label: "Clients",
        color: "#3B82F6", // Bright blue
    },
    projects: {
        label: "Projects", 
        color: "#10B981", // Emerald green
    },
    tasks: {
        label: "Tasks",
        color: "#F59E0B", // Amber
    },
    users: {
        label: "Users",
        color: "#EF4444", // Red
    },
} satisfies ChartConfig;

export function OverviewTrends({ monthlyData }: OverviewTrendsProps) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        >
        <Card>
            <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-4 w-4" />
                6-Month Growth Trends
            </CardTitle>
            <CardDescription className="text-sm">
                Track the growth of clients, projects, tasks, and users over the last 6 months
            </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
            <ChartContainer config={trendsChartConfig} className="h-[300px] w-full">
                <LineChart
                data={monthlyData}
                margin={{
                    top: 10,
                    right: 20,
                    left: 10,
                    bottom: 10,
                }}
                >
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
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 1, r: 3 }}
                    activeDot={{ r: 5, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: "#10B981", strokeWidth: 1, r: 3 }}
                    activeDot={{ r: 5, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: "#F59E0B", strokeWidth: 1, r: 3 }}
                    activeDot={{ r: 5, fill: "#F59E0B", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ fill: "#EF4444", strokeWidth: 1, r: 3 }}
                    activeDot={{ r: 5, fill: "#EF4444", stroke: "#fff", strokeWidth: 2 }}
                />
                </LineChart>
            </ChartContainer>
            </CardContent>
        </Card>
        </motion.div>
    );
}
