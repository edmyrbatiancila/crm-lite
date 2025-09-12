import { usePage } from '@inertiajs/react';

interface AuthData {
    user?: {
        [key: string]: unknown;
    };
}

interface PageProps {
    auth: AuthData;
    [key: string]: unknown;
}

export function DebugUserData() {
    const page = usePage<PageProps>();
    const { auth } = page.props;
    
    // Temporarily always show for debugging in production
    const shouldShow = true; // process.env.NODE_ENV !== 'production';
    
    if (!shouldShow) {
        return null;
    }
    
    return (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg text-xs max-w-sm overflow-auto max-h-64 z-50">
            <h3 className="font-bold mb-2">Debug: User Auth Data</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(auth?.user, null, 2)}</pre>
        </div>
    );
}
