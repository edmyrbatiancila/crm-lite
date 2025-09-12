import { useState, useEffect } from 'react';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    first_login_at: string | null;
    created_at: string;
}

export interface ModalState {
    showWelcomeModal: boolean;
    showAdminModal: boolean;
}

export function useModalManager(user: User) {
    const [modalState, setModalState] = useState<ModalState>({
        showWelcomeModal: false,
        showAdminModal: false
    });

    useEffect(() => {
        const shouldShowModal = () => {
            // Check if welcome modal was already dismissed permanently for this user
            const welcomeModalKey = `welcome_modal_dismissed_${user.id}`;
            const adminModalKey = `admin_modal_dismissed_${user.id}`;
            
            const isAdmin = user.role === 'admin' || user.role === 'administrator';
            
            // Check if this is a truly first-time user
            const isFirstTimeUser = (() => {
                // If first_login_at is null, definitely first time
                if (user.first_login_at === null) {
                    return true;
                }
                
                // If first_login_at is set, check if it's within the last few minutes (indicating they just registered and got logged in)
                const firstLoginDate = new Date(user.first_login_at);
                const now = new Date();
                const timeDifference = now.getTime() - firstLoginDate.getTime();
                const minutesSinceFirstLogin = timeDifference / (1000 * 60);
                
                // Also check if they registered recently (same day)
                const createdDate = new Date(user.created_at);
                const isSameDay = createdDate.toDateString() === now.toDateString();
                
                // Consider it first time if they logged in within 5 minutes AND registered today
                return minutesSinceFirstLogin <= 5 && isSameDay;
            })();

            // Only show welcome modal for first-time users (never logged in before or just registered)
            if (!isAdmin && isFirstTimeUser && !localStorage.getItem(welcomeModalKey)) {
                setModalState(prev => ({ ...prev, showWelcomeModal: true }));
            } else if (isAdmin && isFirstTimeUser && !localStorage.getItem(adminModalKey)) {
                // Show admin updates modal for first-time admin users
                setModalState(prev => ({ ...prev, showAdminModal: true }));
            }
        };

        // Delay modal display to ensure page is loaded
        const timer = setTimeout(shouldShowModal, 1000);
        return () => clearTimeout(timer);
    }, [user]);

    const closeWelcomeModal = () => {
        setModalState(prev => ({ ...prev, showWelcomeModal: false }));
        // Mark welcome modal as permanently dismissed for this user
        const welcomeModalKey = `welcome_modal_dismissed_${user.id}`;
        localStorage.setItem(welcomeModalKey, 'true');
    };

    const closeAdminModal = () => {
        setModalState(prev => ({ ...prev, showAdminModal: false }));
        // Mark admin modal as permanently dismissed for this user
        const adminModalKey = `admin_modal_dismissed_${user.id}`;
        localStorage.setItem(adminModalKey, 'true');
    };

    const dismissAllModals = () => {
        setModalState({ showWelcomeModal: false, showAdminModal: false });
        // Mark both modals as permanently dismissed for this user
        const welcomeModalKey = `welcome_modal_dismissed_${user.id}`;
        const adminModalKey = `admin_modal_dismissed_${user.id}`;
        localStorage.setItem(welcomeModalKey, 'true');
        localStorage.setItem(adminModalKey, 'true');
    };

    return {
        modalState,
        closeWelcomeModal,
        closeAdminModal,
        dismissAllModals
    };
}
