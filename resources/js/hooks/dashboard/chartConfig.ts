import { ChartConfig } from "@/components/ui/chart";

export const trendsChartConfig = {
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


export const taskChartConfig = {
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-1))",
    },
    in_progress: {
        label: "In Progress",
        color: "hsl(var(--chart-2))",
    },
    closed: {
        label: "Closed",
        color: "hsl(var(--chart-3))",
    },
    blocked: {
        label: "Blocked",
        color: "hsl(var(--chart-4))",
    },
    waiting_client: {
        label: "Waiting for Client",
        color: "hsl(var(--chart-5))",
    },
    open: {
        label: "Open",
        color: "hsl(var(--chart-6))",
    },

} satisfies ChartConfig;

export const projectChartConfig = {
    open: {
        label: "Open",
        color: "#8B5CF6", // Purple
    },
    in_progress: {
        label: "In Progress",
        color: "#F59E0B", // Amber
    },
    blocked: {
        label: "Blocked",
        color: "#EF4444", // Red
    },
    cancelled: {
        label: "Cancelled",
        color: "#6B7280", // Gray
    },
    completed: {
        label: "Completed",
        color: "#10B981", // Green
    },
} satisfies ChartConfig;