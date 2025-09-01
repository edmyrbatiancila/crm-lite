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
            const isFirstTimeUser = user.first_login_at === null;

            // Only show welcome modal for first-time users (never logged in before)
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
