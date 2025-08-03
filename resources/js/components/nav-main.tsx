import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const []
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                        <Link href={item.href} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}

            {/* Collapsible Admin Menu */}
            <SidebarMenuItem>
                <Collapsible 
                    open={ isAdminOpen } 
                    onOpenChange={setAdminOpen}
                >
                    <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-muted/40 rounded-md">
                        <span className="flex items-center gap-2">
                                <ChevronDown className={`transition-transform ${isAdminOpen ? 'rotate-180' : ''}`} size={16} />
                                <span>Admin</span>
                        </span>
                    </CollapsibleTrigger>
                </Collapsible>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
