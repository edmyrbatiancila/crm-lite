import { Calendar, Database, FileText, User } from "lucide-react";

export const getEventColor = (event: string) => {
    switch (event) {
            case 'created':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'updated':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'deleted':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'restored':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
};

export const getSubjectIcon = (subjectType: string) => {
    switch (subjectType) {
        case 'App\\Models\\User':
            return <User className="h-4 w-4" />;
        case 'App\\Models\\Client':
            return <FileText className="h-4 w-4" />;
        case 'App\\Models\\Project':
            return <Database className="h-4 w-4" />;
        case 'App\\Models\\Task':
            return <Calendar className="h-4 w-4" />;
        default:
            return <FileText className="h-4 w-4" />;
    }
};