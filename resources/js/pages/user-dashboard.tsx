
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';

interface UserDashboardProps {
    stats: {
        clients: number;
        tasks: { [status: string]: number };
        projects: { [status: string]: number };
    };
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
    taskStatusLabels: { value: string; label: string }[];
    projectStatusLabels: { value: string; label: string }[];
}

export default function UserDashboard({ stats, user, taskStatusLabels, projectStatusLabels }: UserDashboardProps) {
    // Define color palettes for statuses (color-blind friendly and visually pleasing)
    const statusColors: Record<string, string> = {
        pending: '#60a5fa', // blue
        in_progress: '#fbbf24', // amber
        closed: '#34d399', // green
        waiting_client: '#a78bfa', // purple
        blocked: '#f87171', // red
        open: '#f472b6', // pink
    };
    const projectColors: Record<string, string> = {
        open: '#60a5fa', // blue
        in_progress: '#fbbf24', // amber
        blocked: '#f87171', // red
        cancelled: '#6b7280', // gray
        completed: '#34d399', // green
    };

    // Prepare chart data for tasks
    const taskChartData = taskStatusLabels.map(s => ({
        status: s.label,
        value: stats.tasks[s.value] || 0,
        fill: statusColors[s.value] || '#a1a1aa',
    }));

    // Prepare chart data for projects
    const projectChartData = projectStatusLabels.map(s => ({
        name: s.label,
        value: stats.projects[s.value] || 0,
        fill: projectColors[s.value] || '#a1a1aa',
    })).filter(item => item.value > 0);

    const totalTasks = Object.values(stats.tasks).reduce((a, b) => a + b, 0);
    const totalProjects = Object.values(stats.projects).reduce((a, b) => a + b, 0);

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user.first_name}!</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Clients You Handle</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.clients}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalTasks}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalProjects}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks by Status</CardTitle>
                            <CardDescription>Distribution of your tasks by status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={Object.fromEntries(taskStatusLabels.map(s => [s.value, { label: s.label, color: statusColors[s.value] || '#a1a1aa' }]))}>
                                <BarChart data={taskChartData} height={300} width={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="status" tickLine={false} axisLine={false} className="text-xs" angle={-45} textAnchor="end" height={80} />
                                    <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" radius={4} >
                                        {taskChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects by Status</CardTitle>
                            <CardDescription>Distribution of your projects by status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={Object.fromEntries(projectStatusLabels.map(s => [s.value, { label: s.label, color: projectColors[s.value] || '#a1a1aa' }]))}>
                                <PieChart width={350} height={300}>
                                    <Pie
                                        data={projectChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={50}
                                        fill="#8884d8"
                                        stroke="white"
                                        strokeWidth={2}
                                        animationBegin={0}
                                        animationDuration={1000}
                                    >
                                        {projectChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
