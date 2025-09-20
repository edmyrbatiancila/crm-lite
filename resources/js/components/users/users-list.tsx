import { User } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Mail, Calendar, User as UserIcon } from "lucide-react";
import ActionButtons from "@/components/shared/action-buttons";

interface UsersListProps {
    data: User[];
    onDelete: (id: number | null) => void;
    canEdit: boolean;
    canDelete: boolean;
}

const UsersList = ({ data, onDelete, canEdit, canDelete }: UsersListProps) => {
    // Desktop Table View
    const DesktopView = () => (
        <Card className="shadow-xl border rounded-2xl">
            <CardContent className="p-0">
                {/* Container with fixed header and scrollable body */}
                <div className="h-[600px] flex flex-col">
                    {/* Fixed header - will not scroll */}
                    <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 py-4 px-4 text-left">
                                        First Name
                                    </TableHead>
                                    <TableHead className="bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 py-4 px-4 text-left">
                                        Last Name
                                    </TableHead>
                                    <TableHead className="bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 py-4 px-4 text-left">
                                        Email Address
                                    </TableHead>
                                    <TableHead className="bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 py-4 px-4 text-left">
                                        Creation Date
                                    </TableHead>
                                    {(canEdit || canDelete) && (
                                        <TableHead className="bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 py-4 px-4 text-left">
                                            Actions
                                        </TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                        </Table>
                    </div>
                    
                    {/* Scrollable body only */}
                    <div className="flex-1 overflow-auto">
                        <Table className="min-w-full">
                            <TableBody>
                                {data.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700">
                                        <TableCell className="py-3 px-4">
                                            {user.first_name}
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            {user.last_name}
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="py-3 px-4">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        {(canEdit || canDelete) && (
                                            <TableCell className="py-3 px-4">
                                                <ActionButtons 
                                                    editRoute="users.edit"
                                                    renderParam={user}
                                                    onDelete={onDelete}
                                                    pageName="user"
                                                    canEdit={canEdit}
                                                    canDelete={canDelete}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Mobile Card View
    const MobileView = () => (
        <div className="space-y-4 max-h-[600px] overflow-y-auto px-2">
            {data.map((user) => (
                <Card key={user.id} className="shadow-lg border rounded-xl hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4">
                        {/* User Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">User Profile</p>
                                </div>
                            </div>
                            {(canEdit || canDelete) && (
                                <ActionButtons 
                                    editRoute="users.edit"
                                    renderParam={user}
                                    onDelete={onDelete}
                                    pageName="user"
                                    canEdit={canEdit}
                                    canDelete={canDelete}
                                />
                            )}
                        </div>

                        {/* User Details */}
                        <div className="space-y-3 border-t pt-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                                        Email Address
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white break-all">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                                        Creation Date
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long', 
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Status indicators */}
                            <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Active User</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    ID: #{user.id}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    return (
        <>
            {/* Desktop and Tablet View */}
            <div className="hidden md:block">
                <DesktopView />
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
                <MobileView />
            </div>
        </>
    );
};

export default UsersList;