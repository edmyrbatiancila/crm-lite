import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { mainNavItems } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export function NavMain() {
    const page = usePage();
    const { isAdmin } = useAuth();

    // Filter navigation items based on permissions
    const filteredNavItems = mainNavItems.filter(item => {
        // Only show Users and Activity Logs pages to admin users
        if (item.href === '/users' || item.href === '/admin/activity-logs') {
            return isAdmin;
        }
        // All other pages are visible to both admin and regular users
        return true;
    });

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {filteredNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
