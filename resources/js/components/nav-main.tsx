import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';
import { collapsibleMenu, mainNavItems } from '@/lib/utils';

export function NavMain() {
    const page = usePage();

    const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
            {mainNavItems.map((item) => (
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
                        onOpenChange={ setIsAdminOpen }
                    >
                        <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-muted/40 rounded-md cursor-pointer">
                            <span className="flex items-center gap-2">
                                <Users size={ 16 } />
                                <span>Admin</span>
                                <ChevronDown className={`transition-transform ${isAdminOpen ? 'rotate-180' : ''}`} size={16} />
                            </span>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="pl-5 mt-1 space-y-1">
                        {collapsibleMenu.map((item) => (
                            <SidebarMenuItem key={ item.title }>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url.startsWith(item.href)}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={ item.href } prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{ item.title }</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
