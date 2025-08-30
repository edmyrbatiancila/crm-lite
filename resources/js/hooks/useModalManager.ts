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
            // Don't show modals if already dismissed in this session
            const sessionKey = `modal_dismissed_${user.id}_${new Date().toDateString()}`;
            if (sessionStorage.getItem(sessionKey)) {
                return;
            }

            const isAdmin = user.role === 'admin' || user.role === 'administrator';
            const isNewUser = user.first_login_at === null;
            const isRecentUser = user.created_at && 
                new Date(user.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days

            if (!isAdmin && (isNewUser || isRecentUser)) {
                // Show welcome modal for new non-admin users
                setModalState(prev => ({ ...prev, showWelcomeModal: true }));
            } else if (isAdmin) {
                // Show admin updates modal for administrators
                setModalState(prev => ({ ...prev, showAdminModal: true }));
            }
        };

        // Delay modal display to ensure page is loaded
        const timer = setTimeout(shouldShowModal, 1000);
        return () => clearTimeout(timer);
    }, [user]);

    const closeWelcomeModal = () => {
        setModalState(prev => ({ ...prev, showWelcomeModal: false }));
        // Mark as dismissed for this session
        const sessionKey = `modal_dismissed_${user.id}_${new Date().toDateString()}`;
        sessionStorage.setItem(sessionKey, 'true');
    };

    const closeAdminModal = () => {
        setModalState(prev => ({ ...prev, showAdminModal: false }));
        // Mark as dismissed for this session
        const sessionKey = `modal_dismissed_${user.id}_${new Date().toDateString()}`;
        sessionStorage.setItem(sessionKey, 'true');
    };

    const dismissAllModals = () => {
        setModalState({ showWelcomeModal: false, showAdminModal: false });
        const sessionKey = `modal_dismissed_${user.id}_${new Date().toDateString()}`;
        sessionStorage.setItem(sessionKey, 'true');
    };

    return {
        modalState,
        closeWelcomeModal,
        closeAdminModal,
        dismissAllModals
    };
}
