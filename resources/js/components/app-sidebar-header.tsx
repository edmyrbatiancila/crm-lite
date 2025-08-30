import { Breadcrumbs } from '@/components/breadcrumbs';
import NotificationDropdown from '@/components/notification-dropdown';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Notification } from '@/types/notifications/INotification';
import { usePage } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { unreadNotifications, unreadCount } = usePage<{
        unreadNotifications: Notification[];
        unreadCount: number;
    }>().props;

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-2">
                <AppearanceToggleDropdown />
                <NotificationDropdown 
                    notifications={unreadNotifications} 
                    unreadCount={unreadCount} 
                />
            </div>
        </header>
    );
}
